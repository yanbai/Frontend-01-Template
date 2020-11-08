// 截取文本
export function parseHTML (html, options) {
  while(html) {
    if(!lastTag || !isPlainTextElement(lastTag)) {
      // 父元素为正常元素的处理逻辑
      let textEnd = html.indexOf('<')
      if(textEnd === 0) {
        // 注释
        if(comment.test(html)) {
          continue
        }
        if(conditionalComment.test(html)) {
          continue
        }
        // DOCTYPE
        // 结束标签
        const endTagMatch = html.match(endTag)
        if(endTagMatch) {
          continue
        }
        // 开始标签
        const startTagMatch = parseStartTag()
        if(startTagMatch) {
          continue
        }
      }

      let text, rest, next
      if(textEnd >= 0) {
        // 解析文本
      }

      if(textEnd < 0) {
        text = html
        html = ''
      }

      if(options.chars && text) {
        options.chars(text)
      }

    } else {
      // 父元素为 script style textarea 的处理逻辑
      const stackedTag = lastTag.toLowerCase()
      const reStackedTag = reCache[stackedTag] ||
        (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))

      const rest = html.replace(reStackedTag, function(all, text) {
        if(options.chars) {
          options.chars(text)
        }
        return ''
      })

      html = rest
      options.end(stackedTag)
    }
  }
}
