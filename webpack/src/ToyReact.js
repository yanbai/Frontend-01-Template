const ToyReact = {
  createElement(cls, attrs, ...children) {
    let vdom
    console.log('in createElement', arguments)
    if (typeof cls === 'string') {
      vdom = new ElementWrapper(cls)
    } else {
      vdom = new cls
    }

    for(let k in attrs)
      vdom.setAttribute(k, attrs[k])

    // let insertChildren = (children) => {
    //   for(let child of children) {
    //     console.log('in insert child', child)
    //     if(
    //       typeof child === 'string' ||
    //       typeof child === 'number' ||
    //       typeof child === 'boolean' ||
    //       child === null
    //     ) {
    //       child = new TextWrapper(String(child))
    //     }
    //     if(typeof child === 'object' && child instanceof Array) {
    //       insertChildren(child)
    //     } else {
    //       vdom.vAppendChild(child)
    //     }
    //   }
    // }

    let insertChildren = (children) => {
      for(let child of children) {
        console.log('in insert child', child)
        if(typeof child === 'object' && child instanceof Array) {
          insertChildren(child)
        } else {
          if(!(child instanceof Component) &&
          !(child instanceof ElementWrapper) &&
          !(child instanceof TextWrapper))
            child = String(child)

          if(typeof child === 'string')
            child = new TextWrapper(child)

          vdom.vAppendChild(child)
        }
      }
    }

    insertChildren(children)

    return vdom
  },
  render(vdom, element) {
    let range = document.createRange()
    if(element.children.length) {
      range.setStartAfter(element.lastChild)
      range.setEndAfter(element.lastChild)
    } else {
      range.setStart(element, 0)
      range.setEnd(element, 0)
    }
    vdom.mountTo(range)
  }
}

class TextWrapper {
  constructor(text) {
    this.root = document.createTextNode(text)
  }
  mountTo(range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

class ElementWrapper {
  constructor(tag) {
    this.root = document.createElement(tag)
  }

  setAttribute(key, value) {
    let eventName
    if(key.match(/^on([\s\S]+)$/)) {
      eventName = RegExp.$1.replace(/^[\s\S]/, v => v.toLocaleLowerCase())
      this.root.addEventListener(eventName, value)
    }
    if(name === "className")
      name = "class"
    this.root.setAttribute(key, value)
  }

  vAppendChild(vchild) {
    let range = document.createRange()
    if(this.root.children.length) {
      range.setStartAfter(this.root.lastChild)
      range.setEndAfter(this.root.lastChild)
    } else {
      range.setStart(this.root, 0)
      range.setEnd(this.root, 0)
    }
    vchild.mountTo(range)
  }

  mountTo(range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

export class Component {
  constructor(tag) {
    this.children = []
    this.props = Object.create(null)
  }
  setAttribute(name, value) {
    this[name] = value
    this.props[name] = value
  }
  vAppendChild(child) {
    this.children.push(child)
  }
  mountTo(range) {
    this.range = range
    this.update()
  }
  update() {
    let placeholder = document.createComment("placeholder")
    let range = document.createRange()
    range.setStart(this.range.endContainer, this.range.endOffset)
    range.setEnd(this.range.endContainer, this.range.endOffset)
    range.insertNode(placeholder)

    this.range.deleteContents()

    let vdom = this.render()
    vdom.mountTo(this.range)

    // placeholder.parentNode.removeChild(placeholder)
  }
  setState(state) {
    let merge = (oldState, newState) => {
      for(let p in newState) {
        if(typeof newState[p] === 'object') {
          if(typeof oldState[p] !== 'object') {
            oldState[p] = {}
          }
          merge(oldState[p], newState[p])
        } else {
          oldState[p] = newState[p]
        }
      }
    }

    if(!this.state && state)
      this.state = {}

    merge(this.state, state)
    console.log(this.state)
    this.update()
  }
}

export {ToyReact}
