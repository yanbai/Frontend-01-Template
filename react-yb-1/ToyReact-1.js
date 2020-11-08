let ToyReact = {
  createElement(tag, attrs, ...childred) {
    let vdom
    if (typeof tag === 'string') {
      vdom = document.createElement(tag)
      // todo
      vdom.mountTo = function(container) {
        container.appendChild(this)
      }
    } else {
      vdom = new tag
    }

    for(let k in attrs)
      vdom.setAttribute(k, attrs[k])

    for(let child of childred) {
      if (typeof child === 'string') {
        let textNode = new TextWrapper(child)
        vdom.appendChild(textNode.root)
      } else {
        vdom.appendChild(child)
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

class Component {
  // constructor() {
  //   this.root = document.createElement('div')
  // }

  // setAttribute(key, value) {
  //   this[key] = value
  // }

  // appendChild(child) {

  // }
}

export {ToyReact, Component}
