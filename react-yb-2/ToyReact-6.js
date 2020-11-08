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
          typeof child === 'boolean' ||
          child === null
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

  // render(vdom, container) {
  //   vdom.mountTo(container)
  // }
  render(vdom, container) {
    let range = document.createRange()
    if(container.children.length) {
      range.setStartAfter(container.lastChild)
      range.setEndAfter(container.lastChild)
    } else {
      range.setStart(container, 0)
      range.setEnd(container, 0)
    }
    vdom.mountTo(range)
  }
}

class TextWrapper {
  constructor(text) {
    this.root = document.createTextNode(text)
  }
  mountTo(range) {
    // container.appendChild(this.root)
    range.deleteContents()
    range.insertNode(this.root)
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
    // this.children.push(child)
    let range = document.createRange()
    if(this.root.children.length) {
      range.setStartAfter(this.root.lastChild)
      range.setEndAfter(this.root.lastChild)
    } else {
      range.setStart(this.root, 0)
      range.setEnd(this.root, 0)
    }
    child.mountTo(range)
  }

  mountTo(range) {
    // for(let child of this.children) {
    //   child.mountTo(this.root)
    // }
    // container.appendChild(this.root)
    range.deleteContents()
    range.insertNode(this.root)
  }
}

class Component {
  constructor() {
    // console.log('in Component')
    this.children = []
    this.props = Object.create(null)
  }

  setAttribute(key, value) {
    this[key] = value
    this.props[key] = value
  }

  vAppendChild(child) {
    this.children.push(child)
  }

  mountTo(range) {
    // let vdom = this.render()
    // vdom.mountTo(container)
    this.range = range
    this.update()
  }

  update() {
    let placeholder = document.createComment('placeholder')
    let range = document.createRange()
    range.setStart(this.range.endContainer, this.range.endOffset)
    range.setEnd(this.range.endContainer, this.range.endOffset)
    range.insertNode(placeholder)

    this.range.deleteContents()

    let vdom = this.render()
    vdom.mountTo(this.range)
  }

  setState(state) {
    function merge(newState, oldState) {
      for (let k in newState) {
        if (!(k in oldState)) {
          oldState[k] = newState[k]
        } else {
          if(typeof oldState[k] !== 'object') {
            oldState[k] = newState[k]
          } else {
            merge(newState[k], oldState[k])
          }
        }
      }
    }
    merge(state, this.state)
    // console.log(this.state)
    this.update()
  }
}

export {ToyReact, Component}
