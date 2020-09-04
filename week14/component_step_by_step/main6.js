function createElement(Cls, attributes, ...children) {
  let element = new Cls({
    config: 'config'
  })

  for(const name in attributes) {
    element.setAttribute(name, attributes[name])
  }

  for (const child of children) {
    // element.appendChild(child);
    // 如果不用appendChild方法，也可以直接push到children，这主要看设计者的思想
    element.children.push(child)
  }

  return element
}

class Parent {
  constructor(config) {
    this.children = []
  }

  set class(value) {
    console.log('Parent set class', value)
  }

  set id(v) {
    console.log('parent set id', v)
  }

  setAttribute(name, value) {
    console.log(name, value)
  }

  appendChild(child) {
    console.log(child)
  }
}

class Child {}

// https://reactjs.org/docs/introducing-jsx.html
// 此时调用createElement的顺序为1.Child,2.Child,3.Child,4:Parent
// 在JSX中，组件树构建顺序是子元素->父元素
let component = (
  // Parent在createElement中会传入参数：0: ƒ Parent(), 1: {id: "a", class: "b"}, 2: Child {}, 3: Child {}, 4: Child {}
  <Parent id='a' class='b'>
    {/* Child在createElement中会传入参数：0: ƒ Child(), 1: null */}
    <Child></Child>
    <Child></Child>
    <Child></Child>
  </Parent>
)

component.class= 'c'
