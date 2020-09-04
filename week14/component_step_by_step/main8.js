// use Div instead of Parent and Child
function createElement(Cls, attributes, ...children) {
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

// 用户代码
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
    // 在DOM元素上插入属性
    this.root.setAttribute(name, value);
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
// https://reactjs.org/docs/introducing-jsx.html
// 此时调用createElement的顺序为1.Child,2.Child,3.Child,4:Parent
// 在JSX中，组件树构建顺序是子元素->父元素
let component = (
  <Div id='a' class='b'>
    <Div>
      <Div></Div>
    </Div>
    <Div></Div>
    <Div></Div>
  </Div>
)

component.class = 'c'

component.mountTo(document.querySelector('#app'))
