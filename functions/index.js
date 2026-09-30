const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const express = require("express");

admin.initializeApp();
const db = getFirestore();

const app = express();
app.use(express.json({ limit: "16kb" }));

const SLUG_RE = /^[a-z0-9-]+$/;
const DEVICE_RE = /^[A-Za-z0-9_-]{8,64}$/;

const hits = new Map();
function rateLimit(bucket, key, max, windowMs) {
  const now = Date.now();
  const k = bucket + ":" + key;
  const arr = (hits.get(k) || []).filter((t) => now - t < windowMs);
  if (arr.length >= max) return false;
  arr.push(now);
  hits.set(k, arr);
  return true;
}

function clientIp(req) {
  return (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown")
    .toString()
    .split(",")[0]
    .trim();
}

function ratingOf(doc) {
  if (!doc || !doc.exists) return { avg: 0, count: 0 };
  const d = doc.data();
  const count = d.count || 0;
  const sum = d.sum || 0;
  return { avg: count ? Math.round((sum / count) * 10) / 10 : 0, count };
}

app.get("/api/ratings", async (req, res) => {
  try {
    const slugs = String(req.query.slugs || "")
      .split(",")
      .map((s) => s.trim())
      .filter((s) => SLUG_RE.test(s))
      .slice(0, 20);
    const ratings = {};
    if (slugs.length) {
      const snaps = await Promise.all(slugs.map((s) => db.collection("ratings").doc(s).get()));
      slugs.forEach((s, i) => {
        ratings[s] = ratingOf(snaps[i]);
      });
    }
    res.json({ ratings });
  } catch (e) {
    console.error("api error:", e);
    res.status(500).json({ error: "erro interno" });
  }
});

app.get("/api/post/:slug", async (req, res) => {
  const { slug } = req.params;
  if (!SLUG_RE.test(slug)) return res.status(400).json({ error: "slug inválido" });
  try {
    const [ratingSnap, commentsSnap] = await Promise.all([
      db.collection("ratings").doc(slug).get(),
      db.collection("comments").where("slug", "==", slug).where("status", "==", "approved").limit(200).get(),
    ]);
    const comments = commentsSnap.docs
      .map((d) => {
        const c = d.data();
        return {
          id: d.id,
          name: c.name,
          text: c.text,
          createdAt: c.createdAt && c.createdAt.toDate ? c.createdAt.toDate().toISOString() : null,
        };
      })
      .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
      .slice(0, 50);
    res.json({ rating: ratingOf(ratingSnap), comments });
  } catch (e) {
    console.error("api error:", e);
    res.status(500).json({ error: "erro interno" });
  }
});

app.post("/api/post/:slug/vote", async (req, res) => {
  const { slug } = req.params;
  const { score, deviceId } = req.body || {};
  if (!SLUG_RE.test(slug)) return res.status(400).json({ error: "slug inválido" });
  if (!Number.isInteger(score) || score < 1 || score > 5) {
    return res.status(400).json({ error: "nota deve ser de 1 a 5" });
  }
  if (typeof deviceId !== "string" || !DEVICE_RE.test(deviceId)) {
    return res.status(400).json({ error: "deviceId inválido" });
  }
  if (!rateLimit("vote", clientIp(req), 20, 60000)) {
    return res.status(429).json({ error: "muitas tentativas" });
  }
  try {
    const ratingRef = db.collection("ratings").doc(slug);
    const voteRef = ratingRef.collection("votes").doc(deviceId);
    const rating = await db.runTransaction(async (tx) => {
      const [ratingSnap, voteSnap] = await Promise.all([tx.get(ratingRef), tx.get(voteRef)]);
      const prev = voteSnap.exists ? voteSnap.data().score : 0;
      const d = ratingSnap.exists ? ratingSnap.data() : { count: 0, sum: 0 };
      const count = (d.count || 0) + (prev === 0 ? 1 : 0);
      const sum = (d.sum || 0) - prev + score;
      tx.set(voteRef, { score, updatedAt: FieldValue.serverTimestamp() });
      tx.set(
        ratingRef,
        { count, sum, avg: count ? sum / count : 0, updatedAt: FieldValue.serverTimestamp() },
        { merge: true }
      );
      return { avg: count ? Math.round((sum / count) * 10) / 10 : 0, count };
    });
    res.json({ ok: true, rating });
  } catch (e) {
    console.error("api error:", e);
    res.status(500).json({ error: "erro interno" });
  }
});

app.post("/api/post/:slug/comment", async (req, res) => {
  const { slug } = req.params;
  const { name, text, website } = req.body || {};
  const accepted = () => res.json({ ok: true, pending: true });
  if (!SLUG_RE.test(slug)) return res.status(400).json({ error: "slug inválido" });
  if (typeof website === "string" && website.trim() !== "") return accepted();
  const cleanName = typeof name === "string" ? name.trim().slice(0, 60) : "";
  const cleanText = typeof text === "string" ? text.trim().slice(0, 1000) : "";
  if (cleanName.length < 2 || cleanText.length < 2) {
    return res.status(400).json({ error: "preencha nome e comentário" });
  }
  if (!rateLimit("comment", clientIp(req), 5, 600000)) {
    return res.status(429).json({ error: "muitas tentativas" });
  }
  try {
    await db.collection("comments").add({
      slug,
      name: cleanName,
      text: cleanText,
      status: "pending",
      createdAt: FieldValue.serverTimestamp(),
    });
    return accepted();
  } catch (e) {
    console.error("api error:", e);
    return res.status(500).json({ error: "erro interno" });
  }
});

exports.api = functions.https.onRequest(app);
