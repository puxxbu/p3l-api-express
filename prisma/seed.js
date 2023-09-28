const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Menambahkan data pengguna
  for (let i = 0; i < 10; i++) {
    await prisma.contact.createMany({
      data: [
        {
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          phone: "12345678" + i,
          username: "pablo1",
        },
        {
          first_name: "Jane",
          last_name: "Smith",
          email: "jane.smith@example.com",
          phone: "98765432" + i,
          username: "pablo1",
        },
      ],
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
