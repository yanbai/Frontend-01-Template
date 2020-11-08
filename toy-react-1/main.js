import {ToyReact} from './ToyReact.js'

let component = (<MyComponent name="a" id="ida">
  <div>inner hello</div>
</MyComponent>)

console.log(component)
ToyReact.render(
  component,
  document.body
)
