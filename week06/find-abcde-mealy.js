function finda(s) {
    let state = start
    for (let c of s) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if(c === 'a') {
        return findB
    } else {
        return start
    }
}

function end(c) {
    return end
}

function findB(c) {
    if(c === 'b') {
        return findC
    } else {
        return start(c)
    }
}

function findC(c) {
    if(c === 'c') {
        return findD
    } else {
        return start(c)
    }
}

function findD(c) {
    if(c === 'd') {
        return findE
    } else {
        return start(c)
    }
}

function findE(c) {
    if(c === 'e') {
        return end
    } else {
        return start(c)
    }
}

let res = finda('sfsabcdesdf')
console.log(res)