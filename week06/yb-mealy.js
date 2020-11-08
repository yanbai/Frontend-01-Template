// function finda(s) {
//   let foundA = false
//   for(let c of s) {
//     if(c === 'a') {
//       foundA = true
//     } else if(foundA && c === 'b') {
//       return true
//     }
//   }
//   return false
// }


// let res = finda('sfsabfsdf')
// console.log(res)


// function findabcde(s) {
//   let foundA = false
//   let foundB = false
//   let foundC = false
//   let foundD = false
//   for(let c of s) {
//     if(c === 'a') {
//       foundA = true
//     } else if(c === 'b' && foundA) {
//       foundB = true
//     } else if(c === 'c' && foundB) {
//       foundC = true
//     } else if(c === 'd' && foundC) {
//       foundD = true
//     } else if(c === 'e' && foundD) {
//       return true
//     } else {
//       foundA = false
//       foundB = false
//       foundC = false
//       foundD = false
//     }
//   }
//   return false
// }

function start(s) {
  let state = findA
  for (let c of s) {
    state = state(c)
  }
  return state === end
}

function findA(c) {
  if(c === 'a') {
    return findB
  } else {
    return findA
  }
}

function findB(c) {
  if(c === 'b') {
    return findC
  } else {
    return findA(c)
  }
}

function findC(c) {
  if(c === 'c') {
    return findD
  } else {
    return findA(c)
  }
}

function findD(c) {
  if(c === 'd') {
    return findE
  } else {
    return findA(c)
  }
}

function findE(c) {
  if(c === 'e') {
    return end
  } else {
    return findA(c)
  }
}

function end(c) {
  return end
}

let res = start('sfsababcdesdf')
console.log(res)
