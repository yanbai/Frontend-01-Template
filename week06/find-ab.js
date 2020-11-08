function finda(s) {
    let foundA = false
    for (let c of s) {
        if(c === 'a') {
            foundA = true
        } else if(foundA && c == 'b') {
            return true
        }
    }
    return false
}

let res = finda('sfsabfsdf')
console.log(res)
