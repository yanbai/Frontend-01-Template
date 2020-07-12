const CSSwhat = require("css-what")

// let res = CSSwhat.parse("#id div.a#id, div#a.b .c[id=x], div~span, div + span")
// console.log(res)

function splitSelector(selector) {
  return selector
    .replace(/\s*([>+~])\s*/g, '$1')
    .replace(/\s+/g, ' ') // collapase redudant space
    .split(/(?=[>~+\s])|(?<=[>~+\s])|\s(?=[^\]]*?(?:\[|$))/g); // split css selectors
}

// function isChildSymbol(selector, currentElement) {
//   if(selector === '>') {
//     return findParent(selector, currentElement)
//   } else {
//     return false
//   }
// }
// function findParent(selector, currentElement) {
//   if(match(selector, currentElement.parentElement)) {

//   }
// }

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

let res_1 = match('.title', document.getElementById('ele_1'))
let res_2 = match('h2[name]', document.getElementById('ele_2'))
let res_3 = match('h2[name^="product"]', document.getElementById('ele_3'))
let res_4 = match('h2[name$="owner"]', document.getElementById('ele_4'))
let res_5 = match('#ele_1', document.getElementById('ele_1'))
let res_6 = match('h2[name="product_title"]', document.getElementById('ele_2'))

let res_7 = match('h2[name="product_error"]', document.getElementById('ele_2')) // false
let res_8 = match('h2[name^="error"]', document.getElementById('ele_2')) // false
let res_9 = match('h2[name$="error"]', document.getElementById('ele_2')) // false
let res_10 = match('h3', document.getElementById('ele_2')) // false
let res_11 = match('#error', document.getElementById('ele_2')) // false
let res_12 = match('.error', document.getElementById('ele_2')) // false

let res_13 = match('.container > .title', document.getElementById('ele_1'))
let res_14 = match('.container > .error', document.getElementById('ele_1')) // false
let res_15 = match('.error > .title', document.getElementById('ele_1')) // false

let res_16 = match('.title + [name="product_title"]', document.getElementById('ele_2'))
let res_17 = match('.error + [name="product_title"]', document.getElementById('ele_2')) // false
let res_18 = match('.title + .error', document.getElementById('ele_2')) // false

let res_19 = match('.page [name="product_title"]', document.getElementById('ele_2'))
let res_20 = match('.outer [name="product_title"]', document.getElementById('ele_2'))
let res_21 = match('.error [name="product_title"]', document.getElementById('ele_2')) // false
let res_22 = match('.page [name="error"]', document.getElementById('ele_2')) // false

let res_23 = match('#ele_2 ~ [name="product_price"]', document.getElementById('ele_3'))
let res_24 = match('#ele_2 ~ [name]', document.getElementById('ele_3'))
let res_25 = match('#ele_4 ~ [name]', document.getElementById('ele_3')) // false
let res_26 = match('#error ~ [name]', document.getElementById('ele_3')) // false

// console.log(res_1)
// console.log(res_2)
// console.log(res_3)
// console.log(res_4)
// console.log(res_5)
// console.log(res_6)
// console.log(res_7)
// console.log(res_8)
// console.log(res_9)
// console.log(res_10)
// console.log(res_11)
// console.log(res_12)

// console.log(res_13)
// console.log(res_14)
// console.log(res_15)

// console.log(res_16)
// console.log(res_17)
// console.log(res_18)

// console.log(res_19)
// console.log(res_20)
// console.log(res_21)
// console.log(res_22)

console.log(res_23)
console.log(res_24)
console.log(res_25)
console.log(res_26)
