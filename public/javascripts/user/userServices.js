const bcrypt = require("bcryptjs")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const user = {
  async registartion(regData) {
    const { name, email, password } = regData
    const candidate = await prisma.user.findUnique({ where: { email } })
    if (candidate) {
      console.log(`Пользователь c ${email} найден`)
      return {
        code: 400,
        message: `Пользователь с ${email} уже существует`,
      }
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      })
      return {
        code: 200,
        message: "Пользователь создан",
      }
    }
  },
  async editUserData(userId, userData) {
    const id = userId
    const { name, lastname, sex, photo } = userData
    const candidate = await prisma.user.findUnique({ where: { id } })
    if (!candidate) {
      return {
        code: 404,
        message: "Такого пользователя не существует",
      }
    }
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        lastname,
        sex,
        photo,
      },
    })

    return {
      code: 200,
      message: "Информация успешно обновлена",
    }
  },
  async getUser(id) {
    const candidate = await prisma.user.findUnique({
      where: { id },
    })
    if (!candidate) {
      return {
        code: 404,
        message: "Такого пользователя не существует",
      }
    }
    const { password, ...otherData } = candidate
    return {
      code: 200,
      otherData,
    }
  },
  async getUsers (page,quantity) {
    const users = await prisma.user.findMany({
      skip: page * quantity - quantity,
      take: quantity,
      orderBy: {
        registerdate: "asc",
      },
    })
    return {
      code: 200,
      users,
    }

  },
  async updatePhoto (id,path){
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          photo: path,
        },
      })
      return {
        code:200,
        message:"Фото добавлено"
      }
  }
}

module.exports = user
