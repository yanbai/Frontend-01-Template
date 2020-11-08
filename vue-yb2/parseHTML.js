parseHTML(template, {
  start(tag, attrs, unary) {
    let element = createASTElement(tag, attrs, currentParent)
  },
  end() {},
  chars(text) {
    let element = {
      type: 3,
      text
    }
  },
  comment(text) {
    let element = {
      type: 3,
      text,
      isComment: true
    }
  }
})

function createASTElement(tag, attrs, parent) {
  return {
    type: 1,
    tag,
    attrsList: attrs,
    parent,
    children: []
  }
}

function advance(n) {
  html = html.subString(n)
}

function parseHTML(html, options) {
  while(html) {
    if(!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf('<')
      if(textEnd === 0) {
        // start tag

        // end tag
      }

      let text, rest, next
      if(textEnd >= 0) {

      }

      if(textEnd < 0) {
        text = html
        html = ''
      }

      if(options.chars && text) {
        options.chars(text)
      }
    }
  }
}


const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

function parseStartTag() {
  const start = html.match(startTagOpen)
  if(start) {
    const match = {
      tagName: start[1],
      attrs: []
    }
    advance(start[0].length)
  }
}

function parseEndTag() {
  const endTagMatch = html.match(endTag)
  if(endTagMatch) {
    html = html.subString(endTagMatch[0].length)
    options.end(endTagMatch[1])
    continue
  }
}

