import configs from "../configs.js";

export default function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    `${configs.authHeaderName}, content-type`
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Expose-Headers", configs.authHeaderName);

  next();
}
