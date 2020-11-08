// parser 内部原理
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

