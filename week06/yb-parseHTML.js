const EOF = Symbol("EOF")
const letterRule = new RegExp(/^[a-zA-Z]$/)
const spaceRule = new RegExp(/^[\t\n\f ]$/)

let currentToken = null
let currentTextNode = null
let currentAttribute = null

let stack = [{
  type: 'document',
  children: []
}]

function emit(token) {
  let top = stack[stack.length - 1]
  if(token.type === 'startTag') {
      let element = {
          type: 'element',
          children: [],
          attributes: [],
          tagName: '',
          parent: null
      }
      element.tagName = token.tagName
      for(let key in token) {
          if(key != 'type' && key != 'tagName') {
              element.attributes.push({
                  name: key,
                  value: token[key]
              })
          }
      }
      top.children.push(element)
      element.parent = top
      if(!token.isSelfClosing) {
          stack.push(element)
      }
      currentTextNode = null
  } else if(token.type === 'endTag') {
      // console.log('---------------currentToken--------------')
      // console.log(currentToken)
      if(top.tagName != token.tagName) {
          throw new Error('Tag start end doesn\'t match')
      } else {
          stack.pop()
      }
      currentTextNode = null
  } else if(token.type === 'text') {
      if(currentTextNode === null) {
          currentTextNode = {
              type: 'text',
              content: ''
          }
          top.children.push(currentTextNode)
      }
      currentTextNode.content += token.content
  }
}

function data(c) {
  if(c === '<') {
    return tagOpen
  }
  else {
    emit({
      type: 'text',
      content: c
    })
    return data
  }
}

// tag open <
// tag name
// end tag open
function tagOpen(c) {
  if(c === '/') {
    return endTagOpen
  } else if(c.match(letterRule)) {
    currentToken = {
      tagName: '',
      type: 'startTag'
    }
    return tagName(c)
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data(c)
  }
}

function tagName(c) {
  if(c.match(spaceRule)) {
    return beforeAttributeNameState
  } else if(c === '>') {
    emit(currentToken)
    return data
  } else if(c.match(letterRule)) {
    currentToken.tagName += c
    return tagName
  } else {
    currentToken.tagName += c
    return tagName
  }
}

function endTagOpen(c) {
  if(c.match(letterRule)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if(c === '>') {
    return data
  } else {
    // ignore
  }
}

// before attr name
// attr name
// after attr name
// before attr value
// attr value double quote
// after attr value quote

function beforeAttributeNameState(c) {
  if(c.match(spaceRule)) {
    return beforeAttributeNameState
  } else if(c === '/' || c === '>') {
    return afterAttributeNameState(c)
  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeNameState(c)
  }
}

function attributeNameState(c) {
  if(c === '/' && c === '>') {
    return afterAttributeNameState(c)
  } else if(c === '=') {
    return beforeAttributeValueState
  } else if(c.match(letterRule)) {
    currentAttribute.name += c.toLowerCase()
    return attributeNameState
  } else {
    currentAttribute.name += c.toLowerCase()
    return attributeNameState
  }
}

function afterAttributeNameState(c) {
  if(c.match(spaceRule)) {
    return afterAttributeNameState
  } else if(c === '=') {
    return beforeAttributeValueState
  } else if(c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = {
        name: '',
        value: ''
    }
    return attributeNameState(c)
  }
}

function beforeAttributeValueState(c) {
  if(c.match(spaceRule)) {
    return beforeAttributeValueState
  } else if(c === '"') {
    return attributeValueDoubleQuotedState
  }
}

function attributeValueDoubleQuotedState(c) {
  if(c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterAttributeValueQuotedState
  } else {
    currentAttribute.value += c
    return attributeValueDoubleQuotedState
  }
}

function afterAttributeValueQuotedState(c) {
  if(c.match(spaceRule)) {
    return beforeAttributeNameState
  } else if(c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else {
    currentAttribute.value += c
    return attributeValueDoubleQuotedState
  }
}

function parseHTML (html){
  let state = data
  for(let c of html) {
      state = state(c)
  }
  // state = state(EOF)
  return stack[0]
}
let res = parseHTML('<div class="container" id="app">sub_1<span>sub_2</span></div>')
console.log(res)
console.log(stack)
