import { P24 } from "@ingameltd/node-przelewy24";

const merchantId = process.env.P24_MERCHANT_ID!;
const posId = process.env.P24_POS_ID!;
const apiKey = process.env.P24_API_KEY!;
const crcKey = process.env.P24_CRC_KEY!;

export const client = new P24(Number(merchantId), Number(posId), apiKey, crcKey, { sandbox: true });
