function createElement(Cls, attributes, ...children) {
  console.log(arguments)

  let obj = new Cls()

  for (const name in attributes) {
    obj[name] = attributes[name]
  }

  return obj
}

class Parent {
  set class(value) {
    console.log('Parent set class', value)
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

component.class = 'c'
// 也会触发Parent中的set class
