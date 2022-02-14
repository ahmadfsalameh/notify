import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send();

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send();
  }
}
