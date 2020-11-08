const EOF = Symbol("EOF")
const letterRule = new RegExp(/^[a-zA-Z]$/)
const spaceRule = new RegExp(/^[\t\n\f ]$/)

let currentToken = null
let currentAttribute = null
let currentTextNode = null

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
    if(c == "<") {
        return tagOpen
    } else if (c === EOF) {
        emit({
            type: 'EOF'
        })
        return
    } else {
        emit({
            type: 'text',
            content: c
        })
        return data
    }
}

function tagOpen(c) {
    if(c === '/') {
        return endTagOpen
    } else if(c.match(letterRule)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        emit({
            type: 'text',
            content: c
        })
        return
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

    } else if(c === EOF) {

    } else {

    }
}

function tagName(c) {
    if(c.match(spaceRule)) {
        return beforeAttributeName
    } else if(c === '/') {
        return selfClosingStartTag
    } else if(c.match(letterRule)) {
        currentToken.tagName += c
        return tagName
    } else if(c === '>') {
        emit(currentToken)
        return data
    } else {
        currentToken.tagName += c
        return tagName
    }
}

function selfClosingStartTag(c) {
    if(c === '>') {
        currentToken.isSelfClosing = true
        emit(currentToken)
        return data
    } else if(c === EOF) {

    } else {

    }
}

function beforeAttributeName(c) {
    if(c.match(spaceRule)) {
        return beforeAttributeName
    } else if(c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c)
    } else if(c === '=') {

    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function attributeName(c) {
    if(c.match(spaceRule) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c)
    } else if(c === '=') {
        return beforeAttributeValue
    } else if(c === '\u0000') {

    } else if(c === '\"' || c === '\'' || c === '<'){

    } else {
        currentAttribute.name += c
        return attributeName
    }
}

function afterAttributeName(c) {
  if(c.match(spaceRule)) {
      return afterAttributeName
  } else if(c === '/') {
      return selfClosingStartTag
  } else if(c === '=') {
      return beforeAttributeValue
  } else if(c === '>') {
      currentToken[currentAttribute.name] = currentAttribute.value
      emit(currentToken)
      return data
  } else if(c === EOF) {

  } else {
      currentToken[currentAttribute.name] = currentAttribute.value
      currentAttribute = {
          name: '',
          value: ''
      }
      return attributeName(c)
  }
}

function beforeAttributeValue(c) {
    if(c.match(spaceRule) || c === '/' || c === '>' || c === EOF) {
        return beforeAttributeValue
    } else if(c === '\"') {
        return doubleQuotedAttributeValue
    } else if (c === '\'') {
        return singleQuotedAttributeValue
    } else if(c === '>') {
        // return data
    } else {
        return UnquotedAttributeValue(c)
    }
}

function doubleQuotedAttributeValue(c) {
    if(c === '\"') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if(c === '\u0000') {

    } else if(c === EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(c) {
    if(c === '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if(c === '\u0000') {

    } else if(c === EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function UnquotedAttributeValue(c) {
    if(c.match(spaceRule)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if(c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if(c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if(c === '\u0000') {

    } else if(['\"', '\'', '<', '=', '`'].includes(c)) {

    } else if(c === EOF) {

    } else {
        currentAttribute.value += c
        return UnquotedAttributeValue
    }
}

function afterQuotedAttributeValue(c) {
    if(c.match(spaceRule)) {
        return beforeAttributeName
    } else if(c === '/') {
        return selfClosingStartTag
    } else if(c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if(c === EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function parseHTML (html){
    let state = data
    for(let c of html) {
        state = state(c)
    }
    state = state(EOF)
    return stack[0]
}

let res = parseHTML('<div class="container" id="app">sub_1<span>sub_2</span></div>')
console.log(res)
console.log(stack)
module.exports.parseHTML = parseHTML
