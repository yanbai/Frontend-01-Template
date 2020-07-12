let pattern = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
]

let currentColor = 1

let ending = false

function hit(e, color, rect) {
  if(ending) return
  if(!!pattern[rect['row']][rect['col']]) return
  pattern[rect['row']][rect['col']] = color
  currentColor = 3 - currentColor
  show(pattern)
  if(checkWin(pattern, color)) {
    console.log(`${color} is win`)
    ending = true
  }
}

function show(pattern) {
  document.getElementById('app').innerHTML = ''
  let container = document.createElement('div')
  container.classList.add('container')
  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
      let rect = {
        row: i,
        col: j
      }
      let ele = document.createElement('i')
      ele.classList.add('cube')
      ele.innerText = pattern[i][j] ? pattern[i][j] : ''
      ele.addEventListener('click', (e) => {
        hit(e, currentColor, rect)
      })
      container.appendChild(ele)
    }
  }
  document.getElementById('app').appendChild(container)
}

function checkWin(pattern, color) {
  let isWin
  for(let i=0; i<3; i++) {
    isWin = true
    for(let j=0; j<3; j++) {
      if(pattern[i][j] !== color) isWin = false
    }
    return isWin
  }

  for(let j=0; j<3; j++) {
    isWin = true
    for(let i=0; i<3; i++) {
      if(pattern[i][j] !== color) isWin = false
      return isWin
    }
  }
  for(let i=0; i<3; i++) {
    isWin = true
    if(pattern[i][i] !== color) isWin = false
    return isWin
  }
  for(let i=0; i<3; i++) {
    isWin = true
    if(pattern[i][2 -i] !== color) isWin = false
    return isWin
  }
  return isWin
}

show(pattern)
