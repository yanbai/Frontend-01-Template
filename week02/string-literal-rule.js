function _or() {
  return [...arguments].join('|')
}

function _completeMatch(str) {
  return `^${str}$`
}
const HexDigit = '[0-9a-fA-F]'
const Hex4Digits = `${HexDigit}{4}`
const CodePoint = '[\\u0x000000-\\u0x10FFFF]'
const LS = '\\u2028'
const PS = '\\u2029'
const LineTerminatorSequence = `[\\u000A\\u000D\\u2028\\u2029]`
const LineContinuation = `\\${LineTerminatorSequence}`
const LineTerminator = `[\\u000A\\u000D\\u2028\\u2029]`
const SingleEscapeCharacter = `[\\'\\"\\\\\\b\\f\\n\\r\\t\\v]`

const EscapeCharacter = _or(
  SingleEscapeCharacter,
  '\\d',
  'x',
  'u'
)
NonEscapeCharacter = `[^${EscapeCharacter}${LineTerminator}]`
const CharacterEscapeSequence = _or(
  SingleEscapeCharacter,
  NonEscapeCharacter
)
const HexEscapeSequence = `x${HexDigit}${HexDigit}`
const UnicodeEscapeSequence = _or(
  `u${Hex4Digits}`,
  `u{${CodePoint}}`
)

const EscapeSequence = _or(
  CharacterEscapeSequence,
  '0',
  HexEscapeSequence,
  UnicodeEscapeSequence
)

const DoubleStringCharacter = _or(
  _completeMatch(`[^\\"\\\\${LineTerminator}]`),
  _completeMatch(LS),
  _completeMatch(PS),
  _completeMatch(`\\(${EscapeSequence})`),
  _completeMatch(LineContinuation)
)

// console.log(EscapeSequence)
console.log(new RegExp(`\\(${EscapeSequence})`).test('\s'))
// console.log(new RegExp(DoubleStringCharacter).test('\u2028'))

exports._or = _or
