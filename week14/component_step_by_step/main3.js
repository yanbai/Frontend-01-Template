class Div {}

function createElement(Cls, attributes) {
  let obj = new Cls()

  for (const name in attributes) {
    obj[name] = attributes[name]
  }

  return obj
}

// 如果Div为大写，在createElement中打印出class Div
let component = <Div id='a' class='b' />

