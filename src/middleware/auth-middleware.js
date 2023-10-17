import { prismaClient } from "../app/database.js";
import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403); //token is invalid

    const user = await prismaClient.akun.findFirst({
      where: {
        username: decoded.username,
      },
    });

    if (user.token !== token) return res.sendStatus(403); //token is invalid

    req.user = user;
    console.log(user);
    next();
  });
};

// const token = req.get("Authorization");
// if (!token) {
//   res
//     .status(401)
//     .json({
//       errors: "Unauthorized",
//     })
//     .end();
// } else {
//   const user = await prismaClient.akun.findFirst({
//     where: {
//       token: token,
//     },
//   });
//   if (!user) {
//     res
//       .status(401)
//       .json({
//         errors: "Unauthorized",
//       })
//       .end();
//   } else {
//     req.user = user;
//     next();
//   }
// }
