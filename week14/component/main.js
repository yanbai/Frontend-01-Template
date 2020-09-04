// require("./foo.js")
function create(Cls, attr) {
  let o = new Cls
  for(let name in attr) {
    o[name] = attr[name]
  }
  return o
}

class Div {
  constructor(config) {
    this.children = []
    this.root = document.createElement('div')
    this.attributes = new Map()
    this.properties = new Map()
  }
  set class(v) {
    console.log('Parent::class', v)
  }
  set id(v) {
    console.log('Parent::id', v)
  }
  setAttribute(name, value) {
    console.log(name, value)
    this.attributes.set(name, value)
  }
  setProperty(name, value) {
    this.properties.set(name, value)
  }
  appendChild(child) {
    console.log('Parent::appendChild', child)
    this.children.push(child)
  }
  mountTo(parent) {
    this.render().mountTo(parent)
    for(const child of this.children) {
      child.mountTo(this.slot)
    }
  }
  render() {
    this.slot = <div></div>

    return (
      <article>
        <h1>{this.attributes.get('title')}</h1>
        <h2>{this.properties.get('title')}</h2>
        <header>I am header</header>
        {this.slot}
        <footer>this is a footer</footer>
      </article>
    )
  }
}
// process text
class Text {
  constructor(text) {
    this.children = []
    this.root = document.createTextNode(text)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
    for(const child of this.children) {
      child.mountTo(this.root)
    }
  }
}

class Wrapper {
  constructor(type) {
    this.children = []
    this.root = document.createElement(type)
  }
  // property
  set class(v) {
    console.log('Parent::class', v);
  }
  // property
  set id(v) {
    console.log('Parent::id', v);
  }
  // attribute
  setAttribute(name, value) {
    console.log(name, value);
    this.root.setAttribute(name, value);
  }
  // children
  appendChild(child) {
    console.log('Parent::appendChild', child);
    // child.mountTo(this.root);
    this.children.push(child);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
    for (const child of this.children) {
      this.slot.appendChild(child);
      // child.mountTo(this.root);
    }
  }
}

function create(Div, attributes, ...children) {
  let o

  if (typeof Div === 'string') {
    o = new Wrapper(Div)
  } else {
    o = new Div({
      config: 'configTest',
      timer: {}
    })
  }

  for(const name in attributes) {
    o.setAttribute(name, attributes[name])
  }

  for (const child of children) {
    if(typeof child === 'string') {
      child = new Text(child)
    }
    o.appendChild(child)
  }

  return o
}

// let component = <Parent id="a" class="b">
//   <Child></Child>
// </Parent>

let component = (
  <Div title='I am a title attr'>
    <span>slot text</span>
  </Div>
)

component.class = 'c'
component.id = 'e'

component.mountTo(document.body)
