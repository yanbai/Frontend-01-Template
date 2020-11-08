// 截取文本

while(html) {
  if(!lastTag || !isPlainTextElement(lastTag)) {
    // 父元素为正常元素的处理逻辑
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
