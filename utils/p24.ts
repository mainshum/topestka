import { P24 } from "@ingameltd/node-przelewy24";
import { TRPCError } from "@trpc/server";

const merchantId = process.env.P24_MERCHANT_ID;
const posId = process.env.P24_POS_ID;
const env = process.env.P24_ENV;

const apiKey = process.env[env=== "production" ? "P24_API_KEY_PROD" : "P24_API_KEY"];
const crcKey = process.env[env === "production" ? "P24_CRC_KEY_PROD" : "P24_CRC_KEY"];

export const client = new P24(Number(merchantId), Number(posId), apiKey, crcKey, { sandbox: env === "sandbox" });

const url = env === "production" ? "https://secure.przelewy24.pl" : "https://sandbox.przelewy24.pl";
// P24 transaction status mapping
type P24TransactionStatus = {
  0: "no-payment";
  1: "advance payment";
  2: "payment made";
  3: "payment returned";
};

type P24TransactionById = {
  statement: string;
  orderId: number;
  sessionId: string;
  status: keyof P24TransactionStatus;
  amount: number;
  currency: string;
};


export const getP24Transaction = async (
  sessionId: string
): Promise<P24TransactionById> => {
  const response = await fetch(
    `${url}/api/v1/transaction/by/sessionId/${sessionId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${merchantId}:${apiKey}`).toString("base64")}`,
      },
    }
  );

  if (!response.ok) {
    throw new TRPCError({
      code: "BAD_GATEWAY",
      message: `P24 API error: ${response.statusText}`,
    });
  }

  const data = await response.json();
  if (!data.data) {
    throw new TRPCError({
      code: "BAD_GATEWAY",
      message: "Invalid P24 API response format",
    });
  }

  return data.data;
};
