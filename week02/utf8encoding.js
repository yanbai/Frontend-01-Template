function addZero (binary, count) {
  if (binary.length > count) {
    return false
  } else if (binary.length === count) {
    return binary
  } else {
    let zeroCount = count - binary.length
    let zeroArr = new Array(zeroCount).fill(0)
    return zeroArr.join('') + binary
  }
}

function UTF8_Encoding (str) {
  let res = ''
  let temp = ''
  for(let i=0, l=str.length; i<l; i++) {
    let codePoint = str.codePointAt(i)
    let binary = codePoint.toString(2)
    let addZeroBinary
    if (codePoint < 128) {
      addZeroBinary = addZero(binary, 7)
      temp = `0${addZeroBinary}`
    } else if (binary < 2048) {
      addZeroBinary = addZero(binary, 11)
      temp = `110${addZeroBinary.slice(0, 5)}10${addZeroBinary.slice(5, 10)}`
    } else if (codePoint < 65536) {
      addZeroBinary = addZero(binary, 16)
      temp = `1110${addZeroBinary.slice(0, 4)}10${addZeroBinary.slice(4, 10)}10${addZeroBinary.slice(10, 16)}`
    } else if (codePoint < 2097152) {
      addZeroBinary = addZero(binary, 21)
      temp = `11110${addZeroBinary.slice(0, 3)}10${addZeroBinary.slice(3, 9)}10${addZeroBinary.slice(9, 15)}10${addZeroBinary.slice(15, 21)}`
    }
    res += String(parseInt(temp, 2).toString(16))
  }
  res = res.toUpperCase()
  return res
}

exports.UTF8_Encoding = UTF8_Encoding
