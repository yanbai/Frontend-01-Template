ToyReact = {
  createElement(tag, attributes, ...children) {
    let element
    if(typeof tag === 'string'){
      element = new Wrapper(tag)
    } else {
      element = new tag
    }

    for(let attr in attributes) {
      element.setAttribute(attr, attributes[attr])
    }

    for(let child of children) {
      if(typeof child === 'string') {
        child = new Text(child)
      }
      // console.log(child.root.outerHTML)
      element.appendChild(child)
    }
    return element
  }
}

class Text {
  constructor(text) {
    this.root = document.createTextNode(text)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class Wrapper {
  constructor(tag) {
    this.root = document.createElement(tag)
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
  <Div
    id='a'
    class='b'
    style={{width: '300px', height: '300px', backgroundColor: 'lightgreen'}}
  >
    {/* Child在createElement中会传入参数：0: ƒ Child(), 1: null */}
    <Div>
      text in parent
      <Div>text in children</Div>
    </Div>
    <Div>text</Div>
    <Div></Div>
    <div></div>
    <span>
      text in span
      <strong>text in strong</strong>
    </span>
    <p>{new Wrapper('em')}</p>
  </Div>
)

console.log(component)
component.class = 'b'
component.mountTo(document.body)
