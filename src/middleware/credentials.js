const allowedOrigins = [
  "https://www.yoursite.com",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://localhost:5173",
];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

export default credentials;
