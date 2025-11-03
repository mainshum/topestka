declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    GITHUB_ID: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    GITHUB_SECRET: string;
    MUX_TOKEN_ID: string;
    MUX_TOKEN_SECRET: string;
    MUX_WEBHOOK_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NODE_ENV: "development" | "production";
    PORT?: string;
    PWD: string;
    MUX_SIGNING_KEY: string;
    MUX_PRIVATE_KEY: string;
    MUX_AUDIENCE: string;
    KURS_ENABLED: string;
    EMAILS_ALLOWED_TO_PURCHASE_REGEX: string,
    COURSE_PRICE: string,
    P24_MERCHANT_ID: string;
    P24_POS_ID: string;
    P24_API_KEY: string;
    P24_CRC_KEY: string;
    P24_API_KEY_PROD: string;
    P24_CRC_KEY_PROD: string;
    P24_ENV: "sandbox" | "production";
  }
}
