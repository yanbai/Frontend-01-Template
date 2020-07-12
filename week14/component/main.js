require("./foo.js")
function create(Cls, attr) {
  let o = new Cls
  for(let name in attr) {
    o[name] = attr[name]
  }
  return o
}

// class Div {

// }

class Parent {

}

class Child {

}

let component = <Parent id="a" class="b">
  <Child></Child>
</Parent>


console.log(component)
// component.setAttribute("id", "a")
