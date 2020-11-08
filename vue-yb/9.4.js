// 截取文本
parseHTML(template, {
  start (tag, attrs, unary) {
    // 解析到标签开始位置时，触发该函数
  },
  end() {

  },
  chars(text) {
    text = text.trim()
    if(text) {
      const children = currentParent.children
      let expression
      if(expression = parseText(text)) {
        children.push({
          type: 2,
          expression,
          text
        })
      } else {
        children.push({
          type: 3,
          text
        })
      }
    }
  },
  comment(text) {
    // 每当解析到注释时，触发该函数
  }
})

function toString(val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

// example
let ob = {name: 'yanbai'}
with(obj) {
  function toString(val) {
    return val == null
      ? ''
      : typeof val === 'object'
        ? JSON.stringify(val, null, 2)
        : String(val)
  }
  console.log('hello' + toString(name))
}

function parseText(text) {
  const tagRE = /\{\{((?:.|\n)+?)\}\}/g
  if(!tagRE.test(text))
    return

  const tokens = []
  let lastIndex = tagRE.lastIndex = 0
  let match, index

  while((match = tagRE.exec(text))) {
    index = match.index
    // 先把 {{ 前边的文本加到 tokens 中
    if(index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)))
    }
    // 把变量改成_s(x)这样的形式也添加到数组中
    tokens.push(`_s(${match[1].trim()})`)

    // 设置 lastIndex 来保证下一轮循环时， 正则表达式不再重复匹配已经解析过的文本
    lastIndex = index + match[0].length
  }
  // 当所有变量都处理完毕后，如果最后一个变量右边还有文本，就将文本添加到数组中
  if(lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)))
  }
  return tokens.join('+')
}

parseText('hello {{name}}')
// '"hello" +_s(name)'

parseText('hello yanbai')
// undefined

parseText('hello {{name}}, you are {{age}}')
// '"hello "+_s(name)+", you are "+_s(age)'
