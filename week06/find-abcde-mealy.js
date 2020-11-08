function start(s) {
    let state = finda
    for (let c of s) {
        state = state(c)
    }
    return state === end
}

function finda(c) {
    if(c === 'a') {
        return findB
    } else {
        return finda
    }
}

function findB(c) {
    if(c === 'b') {
        return findC
    } else {
        return finda(c)
    }
}

function findC(c) {
    if(c === 'c') {
        return findD
    } else {
        return finda(c)
    }
}

function findD(c) {
    if(c === 'd') {
        return findE
    } else {
        return finda(c)
    }
}

function findE(c) {
    if(c === 'e') {
        return end
    } else {
        return finda(c)
    }
}

function end(c) {
  return end
}

let res = start('sfsabcdesdf')
console.log(res)
