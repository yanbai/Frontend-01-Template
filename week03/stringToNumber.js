// todo 负数 0 指数
function stringToNumber(s, x) {
  let chars = s.split('')
  let integerNumber = 0
  let decimalNumber = 0
  let i = 0
  let decimalIndex = 1
  while(i < chars.length && chars[i] !== '.') {
    integerNumber = integerNumber * x
    integerNumber += chars[i].codePointAt(0) - '0'.codePointAt(0)
    i++
  }
  if(chars[i] === '.') i++
  while(i < chars.length) {
    let tempCodePoint = chars[i].codePointAt(0) - '0'.codePointAt(0)
    decimalNumber += tempCodePoint / Math.pow(x, decimalIndex)
    decimalIndex++
    i++
  }
  return integerNumber+decimalNumber
}
console.log(stringToNumber("10.234"))
// 10.234