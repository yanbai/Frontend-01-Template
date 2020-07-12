const CSSwhat = require("css-what")

function splitSelector(selector) {
  return selector
    .replace(/\s*([>+~])\s*/g, '$1')
    .replace(/\s+/g, ' ') // collapase redudant space
    .split(/(?=[>~+\s])|(?<=[>~+\s])|\s(?=[^\]]*?(?:\[|$))/g); // split css selectors
}

class StateMachine {
  constructor(props) {
    this.state = {
      index: 0,
      length: props.selectorArr.length,
      currentElement: props.element,
      selectorArr: props.selectorArr
    }
  }
  start() {
    let innerState = this.isCurrentMatched
    for(let i=0, l=this.state.length; i<l; i++) {
      innerState = innerState.call(this, this.state.selectorArr[i], this.state.currentElement)
      this.state.index ++
    }
    return innerState === this.finalMatched
  }
  isCurrentMatched(split, element) {
    if(match(split, element)) {
      if(this.state.index === this.state.length-1) {
        return this.finalMatched
      } else {
        return this.findCombinator
      }
    } else {
      return this.notMatched
    }
  }
  findCombinator(split) {
    switch(split) {
      case '>':
        return this.findParent
        break
      case '+':
        return this.findPrevious
        break
      case ' ':
        return this.findParents
        break
      case '~':
        return this.findSiblings
        break
      default:
        console.error('wrong combinator, only ">","+"," ","~" supported')
        return this.notMatched
        break
    }
  }
  findParent(split) {
    this.state.currentElement = this.state.currentElement.parentElement
    return this.isCurrentMatched(split, this.state.currentElement)
  }
  findPrevious(split) {
    this.state.currentElement = this.state.currentElement.previousElementSibling
    return this.isCurrentMatched(split, this.state.currentElement)
  }
  findParents(split) {
    let matched
    while(this.state.currentElement.parentElement) {
      this.state.currentElement = this.state.currentElement.parentElement
      if(match(split, this.state.currentElement)) {
        matched = true
        break
      } else {
        matched = false
      }
    }
    if(matched) {
      if(this.state.index === this.state.length-1) {
        return this.finalMatched
      } else {
        return this.findCombinator
      }
    } else {
      return this.notMatched
    }
  }
  findSiblings(split) {
    let matched
    while(this.state.currentElement.previousElementSibling) {
      this.state.currentElement = this.state.currentElement.previousElementSibling
      if(match(split, this.state.currentElement)) {
        matched = true
        break
      } else {
        matched = false
      }
    }
    if(matched) {
      if(this.state.index === this.state.length-1) {
        return this.finalMatched
      } else {
        return this.findCombinator
      }
    } else {
      return this.notMatched
    }
  }
  notMatched() {
    return this.notMatched
  }
  finalMatched() {
    return this.finalMatched
  }
}

function match(selector, element) {
  let selectorOb = CSSwhat.parse(selector)[0]
  let matched = true
  let split = splitSelector(selector)

  // process simple selector
  if(split.length === 1) {
    for (let i=0, l=selectorOb.length; i<l; i++) {
      let parsed = selectorOb[i]
      switch(parsed.type) {
        case 'tag':
          if(parsed.name !== element.tagName.toLowerCase())
            matched = false
          break
        case 'attribute':
          if(parsed.name === 'class') {
            if(!element.classList.contains(parsed.value))
              matched = false
          } else if(parsed.name === 'id') {
            if(parsed.value !== element.getAttribute('id'))
              matched = false
          } else {
            let parsedKey = parsed.name
            let parsedValue = parsed.value
            let parsedAction = parsed.action
            let eleAttrValue = element.getAttribute(parsedKey)
            switch(parsedAction) {
              case 'exists':
                if(!eleAttrValue)
                  matched = false
                break
              case 'equals':
                if(eleAttrValue !== parsedValue)
                  matched = false
                break
              case 'start':
                if(!eleAttrValue.startsWith(parsedValue))
                  matched = false
                break
              case 'end':
                  if(!eleAttrValue.endsWith(parsedValue))
                    matched = false
                  break
            }
          }
          break
      }
    }
  } else {
    // process combinators
    let sm = new StateMachine({
      element: element,
      selectorArr: split.reverse()
    })
    return sm.start()
  }
  return matched
}

window.match_v2 = match
