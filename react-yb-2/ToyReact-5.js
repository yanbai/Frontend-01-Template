let ToyReact = {
  createElement(cls, attrs, ...children) {
    let vdom
    console.log('in createElement', arguments)
    if (typeof cls === 'string') {
      vdom = new DomWrapper(cls)
    } else {
      vdom = new cls
    }

    for(let k in attrs)
      vdom.setAttribute(k, attrs[k])

    let insertChildren = (children) => {
      for(let child of children) {
        console.log('in insert child', child)
        if(
          typeof child === 'string' ||
          typeof child === 'number' ||
          typeof child === 'boolean'
        ) {
          child = new TextWrapper(String(child))
        }
        if(typeof child === 'object' && child instanceof Array) {
          insertChildren(child)
        } else {
          vdom.vAppendChild(child)
        }
      }
    }

    insertChildren(children)

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
  mountTo(container) {
    container.appendChild(this.root)
  }
}

class DomWrapper {
  constructor(tag) {
    // console.log('in DomWrapper')
    this.root = document.createElement(tag)
    this.children = []
  }

  setAttribute(key, value) {
    let eventName
    if(key.match(/^on([\s\S]+)$/)) {
      eventName = RegExp.$1.replace(/^[\s\S]/, v => v.toLocaleLowerCase())
      this.root.addEventListener(eventName, value)
    }
    this.root.setAttribute(key, value)
  }

  vAppendChild(child) {
    this.children.push(child)
  }

  mountTo(container) {
    for(let child of this.children) {
      child.mountTo(this.root)
    }
    container.appendChild(this.root)
  }
}

class Component {
  constructor() {
    // console.log('in Component')
    this.children = []
    this.props = {}
  }

  setAttribute(key, value) {
    this[key] = value
    this.props[key] = value
  }

  vAppendChild(child) {
    this.children.push(child)
  }

  mountTo(container) {
    let vdom = this.render()
    vdom.mountTo(container)
  }
}

export {ToyReact, Component}
