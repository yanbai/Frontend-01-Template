let ToyReact = {
  createElement(tag, attrs, ...children) {
    console.log(arguments)
    let vdom
    if (typeof tag === 'string') {
      vdom = new ElementWrapper(tag)
    } else {
      vdom = new tag
    }

    for(let k in attrs)
      vdom.setAttribute(k, attrs[k])

    function insert(children) {
      if(!children.length)
        return
      for(let i=0, l=children.length; i<l; i++) {
        if(Array.isArray(children[i])) {
          insert(children[i])
        } else {
          let _child
          if(
            !(children[i] instanceof TextWrapper) &&
            !(children[i] instanceof ElementWrapper) &&
            !(children[i] instanceof Component)
          ) {
            _child = String(children[i])
          } else {
            _child = children[i]
          }

          if(typeof _child === 'string') {
            _child = new TextWrapper(_child)
          }

          vdom.appendChild(_child)
        }
      }
    }

    insert(children)

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
  mountTo(parentDom) {
    parentDom.appendChild(this.root)
  }
}

class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
    this.children = []
  }
  setAttribute(key, value) {
    this.root.setAttribute(key, value)
  }
  appendChild(vchild) {
    this.children.push(vchild)
  }
  mountTo(parentDom) {
    for(let vchild of this.children)
      vchild.mountTo(this.root)
    parentDom.appendChild(this.root)
  }
}

class Component {
  constructor() {
    this.children = []
  }
  setAttribute(key, value) {
    this[key] = value
  }
  appendChild(vchild) {
    this.children.push(vchild)
  }
  mountTo(parentDom) {
    let elementInstance = this.render()
    elementInstance.mountTo(parentDom)
  }
}

export {ToyReact, Component}
