import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cd92b93ff8e658",
    pass: "02598e3ce1b59e",
  },
});
