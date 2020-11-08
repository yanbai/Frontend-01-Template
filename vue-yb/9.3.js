// 运行原理
const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/

function advance(n) {
  html = html.substring(n)
}

function parseStartTag() {
  // 解析标签名，判断模板是否复合开始标签特征
  const start = html.match(startTagOpen)
  if(start) {
    const match = {
      tagName: start[1],
      attrs: []
    }
    advance(start[0].length)

    // 解析标签属性
    let end, attrs
    while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      advance(attr[0].length)
      match.attrs.push(attr)
    }

    // 判断自闭和
    if(end) {
      match.unarySlash = end[1]
      advance(end[0].length)
      return match
    }
  }
}

// 开始标签
const startTagMatch = parseStartTag()
if(startTagMatch) {
  handleStartTag(startTagMatch)
  continue
}

