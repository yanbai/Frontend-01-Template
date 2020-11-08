let ToyReact = {
  createElement(cls, attrs, ...childred) {
    let vdom
    if (typeof cls === 'string') {
      vdom = new ClassWrapper(cls)
    } else {
      vdom = new cls
    }

    for(let k in attrs)
      vdom.setAttribute(k, attrs[k])

    for(let child of childred) {
      if (typeof child === 'string') {
        let textNode = new TextWrapper(child)
        vdom.appendChild(textNode.root)
      } else {
        vdom.appendChild(child.root)
      }
    }

    return vdom
  },

  render(vdom, container) {
    vdom.mountTo(container)
  }
}

class TextWrapper {
  constructor(text) {
    this.root = document.createTextNode(text)
  }
}

class ClassWrapper {
  constructor(tag) {
    this.root = document.createElement(tag)
  }

  setAttribute(key, value) {
    this.root.setAttribute(key, value)
  }

  appendChild(child) {
    this.root.appendChild(child)
  }

  mountTo(container) {
    container.appendChild(this.root)
  }
}

class Component {
  constructor() {
    this.root = this.render()
  }

  setAttribute(key, value) {
    this.root.setAttribute(key, value)
  }

  appendChild(child) {
    this.root.appendChild(child)
  }

  mountTo(container) {
    this.root.mountTo(container)
  }
}

export {ToyReact, Component}
