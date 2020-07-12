# 组件化
## setup step
1. add webpack
2. add babel-loader @babel-core @babel/preset-env
3. add main.js index.html
4. add let component = <Div id="a" class="b" />
5. add babel-plugin-transform-react-jsx
6. 可选 add webpack-dev-server

## 构建UI树思路 如何解析jsx
1.
<!-- return object
object是cls实例
{
  timer
}
o遍历attrs执行setAttribute
o执行children执行appendChild
-->
createElement(cls, attrs, ...children) {

}

class Div {
  root
  children
  setAttribute
  appendChild
  mountedTo
}

2.
Wrapper
Text

if(typeof cls === 'string') => Wrapper
else new


3.
Div refactor to
MyComponent {
  root
  children
  setAttribute
  appendChild
  mountedTo

  render
  slot
}

mountedTo() {
  render().mountTo parent
  // loop children
  child appendTo root
}

note:
createElement应该是只构建，UI元素关系。不应该，直接在createElement里面实例化，因为这样child会比parent先构建好。这样就没法从paretn往child传props

jsx就是帮我们构建了一种树形结构

HTML parser也能帮我们构建

range是选中一段html

preact构建UI树的方案： https://github.com/developit/htm
这是一种运行时, 就是template syntax，少了编译
https://github.com/hyperhype/hyperscript
