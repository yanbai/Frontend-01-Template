// todo 负数 0 指数
function numberToString(input, x) {
  let integer = Math.floor(input)
  let decimal = input - integer
  let str = ''
  while(integer > 0) {
    str = String(integer%x) + str
    integer = Math.floor(integer/x)
  }
  while(decimal > 0) {
    tempDecimal = decimal*10
    str += Math.floor(tempDecimal)
    decimal = tempDecimal - decimal
  }
  return str
}
console.log(numberToString(123.321, 10))
// "10.234"
