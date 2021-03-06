import {ToyReact, Component} from './ToyReact.js'
import another from './another.js'
import {anotherTwoConsole} from './another-two.js'

import _ from 'lodash'
import './common.css'
import './main.css'

// import(/* webpackChunkName: "lodash" */'lodash').then(({ default:_ }) => {
//   console.log(_.join('main', 'module'))
// })


let vd
another()
anotherTwoConsole()
class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'x'})}>
        {this.state.value ? this.state.value : ''}
      </button>
    );
  }
}

class Board extends Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

vd = (<Board />)

ToyReact.render(vd, document.body)
