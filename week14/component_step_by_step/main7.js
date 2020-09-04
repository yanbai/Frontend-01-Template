function createElement(Cls, attributes, ...children) {
  console.log('createelement attributes', attributes)
  let element = new Cls({
    config: 'config'
  })

  for (const name in attributes) {
    element.setAttribute(name, attributes[name])
  }

  for (const child of children) {
    element.appendChild(child)
  }

  return element
}

class Parent {
  constructor(config) {
    this.children = []
    this.root = document.createElement('div')
  }

  // 获取class属性
  set class(value) {
    // property
    console.log('Parent set class', value);
  }

  set id(value) {
    console.log('Parent set id', value);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }

  appendChild(child) {
    console.log('parent root', this.root)
    child.mountTo(this.root)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class Child {
  constructor(config) {
    this.children = []
    this.root = document.createElement('div')
  }

  // 获取class属性
  set class(value) {
    // property
    console.log('child set class', value);
  }

  set id(value) {
    console.log('child set id', value);
  }

  setAttribute(name, value) {
    // attribute
    console.log(name, value);
    // 在DOM元素上插入属性
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    console.log('child root', this.root)
    child.mountTo(this.root)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}
// https://reactjs.org/docs/introducing-jsx.html
// 此时调用createElement的顺序为1.Child,2.Child,3.Child,4:Parent
// 在JSX中，组件树构建顺序是子元素->父元素
let component = (
  <Parent id='a' class='b'>
    <Child>
      <Child></Child>
    </Child>
    <Child></Child>
    <Child></Child>
  </Parent>
)

component.class = 'c'

component.mountTo(document.body)
