import {ToyReact, Component} from './ToyReact-3.js'

let vd

// step 1
// vd = <div name="a"><span id="id-1">hello </span>world</div>

// step 2
// class MyComponent extends Component {
//   constructor() {
//     super()
//   }
//   render() {
//     return <div name="a"><span id="id-1">hello </span>world</div>
//   }
// }
// vd = <MyComponent name="a" />

// step 3
class MyComponent extends Component {
  render() {
    return (
      <div>
        outer hello world<em>highlight</em>
        {this.children}
      </div>
    )
  }
}

vd = (<MyComponent name="a" id="ida">
  <div className="slot-1">slot 1</div>
  <div className="slot-2">slot 2</div>
</MyComponent>)

ToyReact.render(vd, document.body)
