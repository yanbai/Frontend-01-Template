// 截取文本

while(html) {
  let text, rest, next
  let textEnd = html.indexOf('<')

  if(textEnd >= 0) {
    rest = html.slice(textEnd)
    while(
      !endTag.test(rest) &&
      !startTagOpen.test(rest)
      // !comment.test(rest) &&
      // !conditionalComment.test(rest)
    ) {
      // 如果'<'在纯文本中，视作纯文本
      next = rest.indexOf('<', 1)
      if(next<0)
        break
      textEnd += next
      rest = html.slice(textEnd)
    }

    text = html.substring(0, textEnd)
    html = html.substring(textEnd)
  }

  // 如果模板中找不到 < ,那么整个模板都是文本
  if(textEnd < 0) {
    text = html
    html = ''
  }

  // 触发钩子函数
  if(options.chars && text) {
    options.chars(text)
  }
}
