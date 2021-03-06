// added text parser
function createElement(Cls, attributes, ...children) {

  let element

  if (typeof Cls === 'string') {
    element = new Wrapper(Cls, {
      config: 'wrapperConfig'
    })
  } else {
    element = new Cls({
      config: 'elementConfig'
    })
  }

  for (const name in attributes) {
    element.setAttribute(name, attributes[name])
  }

  for (const child of children) {
    if (typeof child === 'string') {
      child = new Text(child)
    }
    element.appendChild(child)
  }

  return element
}

// 普通组件
class Div {
  constructor(config) {
    this.children = []
    this.root = document.createElement('div')
  }

  // 获取class属性
  set class(value) {
    // property
    console.log('Div set class', value);
  }

  set id(value) {
    console.log('Div set id', value);
  }

  setAttribute(name, value) {
    // attribute
    console.log(name, value);
    if (name === 'style' && typeof value === 'object') {
      for (const prop in value) {
        this.root.style[prop] = value[prop]
      }
    } else {
      this.root.setAttribute(name, value)
    }
  }

  appendChild(child) {
    console.log('Div root', this.root)
    this.children.push(child)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
    for (const child of this.children) {
      child.mountTo(this.root)
    }
  }
}

// html组件
class Wrapper {
  constructor(type, config) {
    this.children = []
    this.root = document.createElement(type)
  }

  set class(v) {
    console.log('Div set class', v)
  }

  set id(v) {
    console.log('Div set id', v)
  }

  setAttribute(name, value) {
    if(name === 'style' && typeof value === 'object') {
      for (const prop in value) {
        this.root.style[prop] = value[prop]
      }
    } else {
      this.root.setAttribute(name, value)
    }
  }

  appendChild(child) {
    this.children.push(child)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
    for (const child of this.children) {
      child.mountTo(this.root)
    }
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

// https://reactjs.org/docs/introducing-jsx.html
// 此时调用createElement的顺序为1.Child,2.Child,3.Child,4:Parent
// 在JSX中，组件树构建顺序是子元素->父元素
let component = (
  // Div在createElement中会传入参数：0: ƒ Div(), 1: {id: "a", class: "b"}, 2: Child {}, 3: Child {}, 4: Child {}
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
    <p></p>
  </Div>
)

component.class = 'c'

component.mountTo(document.querySelector('#app'))
