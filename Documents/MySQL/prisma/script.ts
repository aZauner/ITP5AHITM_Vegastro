import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getMenu() {
  // const user = await prisma.user.create({
  //   data: {
  //     type: "regularUser",
  //     firstname: "Alexander",
  //     lastname: "Zauner",
  //     username: "Zauna",
  //     password: "1234",
  //     mail: "asfdlkjaösl"
  //   }
  // });
  // const regUser = await prisma.regularUser.create({
  //   data: {
  //     userId: user.userId,
  //     telefoneNumber: "0123456789"
  //   },
  // });
  // console.log(user);
  // console.log(regUser);
  const user2 = await prisma.menu.findUnique({
    where: {
      menuId: 1
    },
    select: {
      Meal: { select: { title: true } },
      restaurant: {
        select: { user: { select: { companyName: true } } }
      }
    }
  })
  console.log(user2);

}

