export const containsUppercase = (value) => {
  if (value === '') {
    return true
  }

  return /[A-Z]/.test(value)
}

export const containsLowercase = (value) => {
  if (value === '') {
    return true
  }

  return /[a-z]/.test(value)
}

export const containsNumber = (value) => {
  if (value === '') {
    return true
  }

  return /[0-9]/.test(value)
}

export const containsSpecial = (value) => {
  if (value === '') {
    return true
  }

  return /[#?!@$%^&*-]/.test(value)
}

export const containsOnlyPassword = (value) => {
  if (value === '') {
    return true
  }

  return /^([A-Za-z0-9#?!@$%^&*-]+)$/i.test(value)
}

export const containsOnlyLatinLetters = (value) => {
  if (value === '') {
    return true
  }

  return /^([A-Za-z]+)$/i.test(value)
}

export const containsOnlyLatinOrCyrillicLetters = (value) => {
  if (value === '') {
    return true
  }

  return /^([A-Za-zА-яа-яё]+)$/i.test(value)
}
