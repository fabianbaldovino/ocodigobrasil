export const SITE_URL = 'https://ocodigobrasil.com.br';
export const SITE_EMAIL = 'fbpaciel@gmail.com';
export const FEATURE_COMMENTS_ENABLED = false;

// ID de medição do Google Analytics 4 (propriedade "O Código Brasil", fluxo
// "Site"). Público por natureza: vai no HTML. Defina a env como string vazia
// para desligar a análise num build.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-XEYYSGTLYJ';
