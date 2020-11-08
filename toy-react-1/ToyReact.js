const ToyReact = {
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

    // for(let child of children) {
    //   if(typeof child === 'string') {
    //     child = new Text(child)
    //   }
    //   element.appendChild(child)
    // }

    let insertChildren = (children) => {
      for(let child of children) {
        if(typeof child === 'string')
          child = new Text(child)
        if(typeof child === 'object' && child instanceof Array) {
          insertChildren(child)
        } else {
          element.appendChild(child)
        }
      }
    }
    insertChildren(children)

    return element
  },
  render(vdom, element) {
    vdom.mountTo(element)
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
    this.children.push(child)
  }

  mountTo(parent) {
    for(let child of this.children) {
      child.mountTo(this.root)
    }
    parent.appendChild(this.root)
  }
}

export class Component {
  constructor(tag) {
    this.children = []
  }
  setAttribute(name, value) {
    this[name] = value
  }
  appendChild(child) {
    this.children.push(child)
  }
  mountTo(parent) {
    let vdom = this.render()
    vdom.mountTo(parent)
  }
}

export {ToyReact}
