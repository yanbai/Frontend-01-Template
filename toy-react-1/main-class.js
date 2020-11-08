ToyReact = {
  createElement(type, attributes, ...children) {
    console.log(type)
    let element = new type
    for(let attr in attributes) {
      element.setAttribute(attr, attributes[attr])
      // element[attr] = attributes[attr]
    }

    for(let child of children) {
      console.log(child.root.outerHTML)
      element.appendChild(child)
    }
    return element
  }
}

class Div {
  constructor() {
    this.root = document.createElement('div')
    this.children = []
  }

  set class(value) {
    console.log('Div set Class', value)
  }

  setAttribute(attribute, value) {
    this.root.setAttribute(attribute, value)
  }

  appendChild(child) {
    child.mountTo(this.root)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

let component = (
  <Div id="container" class="parent">
    <Div id="first" class="child"></Div>
    <Div id="second" class="child"></Div>
    <Div id="third" class="child"></Div>
  </Div>
)

component.class = 'b'
component.mountTo(document.body)
