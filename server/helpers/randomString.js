import crypto from "crypto";

export default function (len) {
  return crypto.randomBytes(len).toString("hex");
}
