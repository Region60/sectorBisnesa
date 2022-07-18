const validatorsMethods = {
  emailPassword(email, password) {
    if (email) {
      if (!vl.isEmail(email)) {
        return "Не корректный электронный адрес"
      }
    }
    if (password) {
      if (!vl.isStrongPassword(password)) {
        return "Не корректный пароль"
      }
    }
  },
  sex(sex) {
    if (sex !== "male" || sex !== "famale") {
      return `поле "Пол" может иметь только два значания: male или famale`
    }
  },
}

module.exports = validatorsMethods
