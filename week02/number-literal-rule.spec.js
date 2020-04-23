const DecimalDigits = require('./number-literal-rule').DecimalDigits
const DecimalIntegerLiteral = require('./number-literal-rule').DecimalIntegerLiteral
const SignedInteger = require('./number-literal-rule').SignedInteger
const ExponentPart = require('./number-literal-rule').ExponentPart
const FirstDecimalLiteralRule = require('./number-literal-rule').FirstDecimalLiteralRule
const SecondDecimalLiteralRule = require('./number-literal-rule').SecondDecimalLiteralRule
const ThirdDecimalLiteralRule = require('./number-literal-rule').ThirdDecimalLiteralRule
const numericLiteralRule = require('./number-literal-rule').numericLiteralRule


describe('number literal rule', ()=> {
  it('DecimalDigits rule', () => {
    expect(new RegExp(DecimalDigits).test('0')).toBe(true)
  })

  it('DecimalIntegerLiteral rule', () => {
    expect(new RegExp(DecimalIntegerLiteral).test('0')).toBe(true)
    expect(new RegExp(DecimalIntegerLiteral).test('1')).toBe(true)
    expect(new RegExp(DecimalIntegerLiteral).test('10')).toBe(true)
  })

  it('SignedInteger rule', () => {
    expect(new RegExp(SignedInteger).test('0')).toBe(true)
    expect(new RegExp(SignedInteger).test('+0')).toBe(true)
    expect(new RegExp(SignedInteger).test('-01')).toBe(true)
  })

  it('ExponentPart rule', () => {
    expect(new RegExp(ExponentPart).test('e+12')).toBe(true)
    expect(new RegExp(ExponentPart).test('e-12')).toBe(true)
    expect(new RegExp(ExponentPart).test('e02')).toBe(true)
  })

  it('FirstDecimalLiteralRule rule', () => {
    expect(new RegExp(FirstDecimalLiteralRule).test('10.')).toBe(true)
    expect(new RegExp(FirstDecimalLiteralRule).test('10.1')).toBe(true)
    expect(new RegExp(FirstDecimalLiteralRule).test('10.1e+12')).toBe(true)
    expect(new RegExp(FirstDecimalLiteralRule).test('10.e+12')).toBe(true)
    expect(new RegExp(FirstDecimalLiteralRule).test('10e+12')).toBe(false)
    expect(new RegExp(FirstDecimalLiteralRule).test('10+1e+12')).toBe(false)
    expect(new RegExp(FirstDecimalLiteralRule).test('01.e+12')).toBe(false)
  })

  it('SecondDecimalLiteralRule rule', () => {
    expect(new RegExp(SecondDecimalLiteralRule).test('.0')).toBe(true)
    expect(new RegExp(SecondDecimalLiteralRule).test('.1')).toBe(true)
    expect(new RegExp(SecondDecimalLiteralRule).test('.01')).toBe(true)
    expect(new RegExp(SecondDecimalLiteralRule).test('.01e+12')).toBe(true)
  })

  it('ThirdDecimalLiteralRule rule', () => {
    expect(new RegExp(ThirdDecimalLiteralRule).test('10')).toBe(true)
    expect(new RegExp(ThirdDecimalLiteralRule).test('10e+12')).toBe(true)
  })

  it('numericLiteralRule rule', () => {
    expect(numericLiteralRule('0b010101')).toBe(true)
    expect(numericLiteralRule('0B010101')).toBe(true)
    expect(numericLiteralRule('0B010102')).toBe(false)

    expect(numericLiteralRule('0o01324567')).toBe(true)
    expect(numericLiteralRule('0O01234567')).toBe(true)
    expect(numericLiteralRule('0O01234568')).toBe(false)

    expect(numericLiteralRule('0x09af')).toBe(true)
    expect(numericLiteralRule('0x09AF')).toBe(true)
    expect(numericLiteralRule('0X09af')).toBe(true)
    expect(numericLiteralRule('0X09AF')).toBe(true)
    expect(numericLiteralRule('0X09AFG')).toBe(false)
    expect(numericLiteralRule('0x09afg')).toBe(false)

    expect(numericLiteralRule('10.')).toBe(true)
    expect(numericLiteralRule('10.1')).toBe(true)
    expect(numericLiteralRule('10.1e+12')).toBe(true)
    expect(numericLiteralRule('10.e+12')).toBe(true)

    expect(numericLiteralRule('.0')).toBe(true)
    expect(numericLiteralRule('.1')).toBe(true)
    expect(numericLiteralRule('.01')).toBe(true)
    expect(numericLiteralRule('.01e+12')).toBe(true)

    expect(numericLiteralRule('10')).toBe(true)
    expect(numericLiteralRule('10e+12')).toBe(true)

    expect(numericLiteralRule('a0')).toBe(false)
    expect(numericLiteralRule('01')).toBe(false)
    expect(numericLiteralRule('+01')).toBe(false)
  })
})
