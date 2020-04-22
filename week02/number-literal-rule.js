function _or() {
  return [...arguments].join('|')
}

function completeMatch(str) {
  return `^${str}$`
}

const BinaryIntegerLiteralRule = completeMatch('^0(b|B)(0|1)+$')
const OctalIntegerLiteralRule = completeMatch('^0(o|O)[0-7]+$')
const HexIntegerLiteralRule = completeMatch('^0(x|X)[0-9a-fA-F]+$')

const DecimalDigits = '\\d+'
const DecimalIntegerLiteral = '(?:0|[1-9]([0-9]+)?)'

const SignedInteger = _or(
  DecimalDigits,
  `\\+${DecimalDigits}`,
  `\\-${DecimalDigits}`
)

const ExponentPart = `[eE](?:${SignedInteger})`

const FirstDecimalLiteralRule = completeMatch(`${DecimalIntegerLiteral}\\.(?:${DecimalDigits})?(?:${ExponentPart})?`)
const SecondDecimalLiteralRule = completeMatch(`\\.${DecimalDigits}(?:${ExponentPart})?`)
const ThirdDecimalLiteralRule = completeMatch(`${DecimalIntegerLiteral}(?:${ExponentPart})?`)

const DecimalLiteral = _or(
  FirstDecimalLiteralRule,
  SecondDecimalLiteralRule,
  ThirdDecimalLiteralRule
)

const NumericLiteral = _or(
  DecimalLiteral,
  BinaryIntegerLiteralRule,
  OctalIntegerLiteralRule,
  HexIntegerLiteralRule
)

let numericLiteralRule = (str) => {
  return new RegExp(NumericLiteral).test(str)
}

exports._or = _or
exports.DecimalDigits = DecimalDigits
exports.DecimalIntegerLiteral = DecimalIntegerLiteral
exports.SignedInteger = SignedInteger
exports.ExponentPart = ExponentPart
exports.FirstDecimalLiteralRule = FirstDecimalLiteralRule
exports.SecondDecimalLiteralRule = SecondDecimalLiteralRule
exports.ThirdDecimalLiteralRule = ThirdDecimalLiteralRule
exports.DecimalLiteral = DecimalLiteral
exports.BinaryIntegerLiteralRule = BinaryIntegerLiteralRule
exports.OctalIntegerLiteralRule = OctalIntegerLiteralRule
exports.HexIntegerLiteralRule = HexIntegerLiteralRule
exports.NumericLiteral = NumericLiteral
exports.numericLiteralRule = numericLiteralRule
