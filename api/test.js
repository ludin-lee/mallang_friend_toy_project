import { createHmac } from "node:crypto";

function generateCI(email) {
  if (email === undefined) return;
  return createHmac("sha256", "Mallang_Secret_Key_zz")
    .update(email)
    .digest("base64");
}

function generatePassword(password) {
  if (!password) return null;
  return createHmac("sha256", "Mallang_Secret_Key_zz")
    .update(password)
    .digest("base64");
}

const a = generatePassword("Wkwkdaus12");
console.log(a);
