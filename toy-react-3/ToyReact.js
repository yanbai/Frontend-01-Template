const ToyReact = {
  createElement(cls, attrs, ...children) {
    let vdom
    if (typeof cls === 'string') {
      vdom = new ElementWrapper(cls)
    } else {
      vdom = new cls
    }

    for(let k in attrs)
      vdom.setAttribute(k, attrs[k])

    let insertChildren = (children) => {
      for(let child of children) {
        if(typeof child === 'object' && child instanceof Array) {
          insertChildren(child)
        } else {
          if(child === null || child === void 0)
            child = ''
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
    this.type = '#text'
    this.children = []
    this.props = Object.create(null)
  }
  mountTo(range) {
    this.range = range
    range.deleteContents()
    range.insertNode(this.root)
  }
}

class ElementWrapper {
  constructor(type) {
    this.type = type
    this.props = Object.create(null)
    this.children = []
    this.element = document.createElement(this.type)
  }

  setAttribute(key, value) {
    this.props[key] = value
  }

  vAppendChild(vchild) {
    this.children.push(vchild)
  }

  mountTo(range) {
    this.range = range
    range.deleteContents()

    for(let name in this.props) {
      let value = this.props[name]
      if(name.match(/^on([\s\S]+)$/)) {
        let eventName = RegExp.$1.replace(/^[\s\S]/, v => v.toLocaleLowerCase())
        this.element.addEventListener(eventName, value)
      }
      if(name === "className")
        name = "class"
      this.element.setAttribute(name, value)
    }

    for (let child of this.children) {
      let range = document.createRange()
      if(this.element.children.length) {
        range.setStartAfter(this.element.lastChild)
        range.setEndAfter(this.element.lastChild)
      } else {
        range.setStart(this.element, 0)
        range.setEnd(this.element, 0)
      }
      child.mountTo(range)
    }

    range.insertNode(this.element)
  }
}

export class Component {
  constructor(tag) {
    this.children = []
    this.props = Object.create(null)
  }
  get type() {
    return this.constructor.name
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
    let vdom = this.render()
    if(this.vdom) {
      let isSameNode = (node1, node2) => {
        let res = true
        if (node1.type !== node2.type) {
          res = false
        }

        for(let name in node1.props) {
          if(
            typeof node1.props[name] === 'function' &&
            typeof node2.props[name] === 'function' &&
            node1.props[name].toString() === node2.props[name].toString()
          ) {
            continue
          }
          if(
            typeof node1.props[name] === 'object' &&
            typeof node2.props[name] === 'object' &&
            JSON.stringify(node1.props[name]) === JSON.stringify(node2.props[name])
          ) {
            continue
          }
          if(node1.props[name] !== node2.props[name])
            res = false
        }

        if(Object.keys(node1.props).length !== Object.keys(node2.props).length)
          res = false

        return res
      }

      let isSameTree = (node1, node2) => {
        if(!isSameNode(node1, node2))
          return false
        if(node1.children.length !== node2.children.length)
          return false
        for(let i=0; i<node1.children.length; i++) {
          if(!isSameTree(node1.children[i], node2.children[i])) {
            return false
          }
        }
        return true
      }

      let replace = (newTree, oldTree, indent) => {
        console.log(indent + 'new', newTree)
        console.log(indent + 'old', oldTree)
        let resOfIsSameTree = isSameTree(newTree, oldTree)
        let resOfIsSameNode = isSameNode(newTree, oldTree)

        if(resOfIsSameTree)
          return

        if(!resOfIsSameNode) {
          newTree.mountTo(oldTree.range)
        } else {
          for(let i =0; i< newTree.children.length; i++) {
            replace(newTree.children[i], oldTree.children[i], '  '+indent)
          }
        }
      }
      replace(vdom, this.vdom, '')
    }else {
      vdom.mountTo(this.range)
    }

    this.vdom = vdom
  }

  setState(state) {
    let merge = (oldState, newState) => {
      for(let p in newState) {
        if(typeof newState[p] === 'object' && newState[p] !== null) {
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
    this.update()
  }
}

export {ToyReact}
