export const isInteger = (number: number) => {
  return {
    valid: number % 1 === 0,
    message: 'number must be integer'
  }
}

export const isPositive = (number: number) => {
  return {
    valid: number >= 0,
    message: 'number must be positive'
  }
}

export const isGreaterThanZero = (number: number) => {
  return {
    valid: number > 0,
    message: 'number must be greater than zero'
  }
}
