const UTF8_Encoding = require('./utf8encoding').UTF8_Encoding

describe('utf8encoding', ()=> {
  it('严 utf-8 code is E4B8A5', () => {
    expect(UTF8_Encoding('严')).toBe('E4B8A5')
  })

  it('z utf-8 code is 7A', () => {
    expect(UTF8_Encoding('z')).toBe('7A')
  })
})
