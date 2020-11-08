import _ from 'lodash';
import './common.css'
import './another.css';

let anotherConsole = () => {
  console.log(_.join(['Another', 'module', 'loaded!'], ' '))
  console.log(123)
}

export default anotherConsole

export function nousedFn() {
  console.log('unused')
}
