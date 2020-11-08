// 截取结束标签
const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

const endTagMatch = '</div>'.match(endTag)
const endTagMatch2 = '<div>'.match(endTag)
console.log(endTagMatch)
console.log(endTagMatch2)

const endTagMatch = html.match(endTag)
if(endTagMatch) {
  html = html.substring(endTagMatch[0].length)
  options.end(endTagMatch[1])
  continue
}

