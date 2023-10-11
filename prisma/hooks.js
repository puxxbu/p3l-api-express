const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const beforeCreateUser = async (params) => {
  const { data } = params;
  const { role } = data;

  if (role === "admin") {
    const count = await prisma.user.count({
      where: {
        role: "admin",
      },
    });

    const id = 2000 + count + 1;
    data.id = id.toString();
  }
};

export default {
  before: {
    createUser: beforeCreateUser,
  },
};
