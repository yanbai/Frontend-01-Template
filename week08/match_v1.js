const CSSwhat = require("css-what")

function splitSelector(selector) {
  return selector
    .replace(/\s*([>+~])\s*/g, '$1')
    .replace(/\s+/g, ' ') // collapase redudant space
    .split(/(?=[>~+\s])|(?<=[>~+\s])|\s(?=[^\]]*?(?:\[|$))/g); // split css selectors
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
    let currentMatched = false
    let findChildSymbol = false
    let findNextSymbol = false
    let findChildrenSymbol = false
    let findSiblingsSymbol = false

    for(i=split.length-1; i>=0; i--){
      if(i === split.length-1) {
        if(match(split[i], element)) {
          currentMatched = true
        }
      } else if(currentMatched && split[i] === '>') {
        findChildSymbol = true
      } else if(findChildSymbol && match(split[i], element.parentElement)) {
        currentMatched = true
      } else if(currentMatched && split[i] === '+') {
        findNextSymbol = true
      } else if(findNextSymbol && match(split[i], element.previousElementSibling)) {
        currentMatched = true
      } else if(currentMatched && split[i] === ' ') {
        findChildrenSymbol = true
      } else if(findChildrenSymbol) {
        let currentElement = element
        while(currentElement.parentElement) {
          currentElement = currentElement.parentElement
          if(match(split[i], currentElement)) {
            currentMatched = true
            break
          } else {
            currentMatched = false
          }
        }
        if(!currentMatched) {
          currentMatched = false
          findChildSymbol = false
          findNextSymbol = false
          findChildrenSymbol = false
          findSiblingsSymbol = false
        }
      } else if(currentMatched && split[i] === '~') {
        findSiblingsSymbol = true
      } else if(findSiblingsSymbol) {
        let currentElement = element
        while(currentElement.previousElementSibling) {
          currentElement = currentElement.previousElementSibling
          if(match(split[i], currentElement)) {
            currentMatched = true
            break
          } else {
            currentMatched = false
          }
        }
        if(!currentMatched) {
          currentMatched = false
          findChildSymbol = false
          findNextSymbol = false
          findChildrenSymbol = false
          findSiblingsSymbol = false
        }
      } else {
        currentMatched = false
        findChildSymbol = false
        findNextSymbol = false
        findChildrenSymbol = false
        findSiblingsSymbol = false
      }
    }
    if(currentMatched) {
      matched = true
    } else {
      matched = false
    }
  }

  return matched
}

window.match_v1 = match

