function nextTick(cb) {
  let callbacks = []
  let pending = false

  let fireCallbacks = () => {
    pending = false
    let copies = callbacks.slice(0)
    callbacks = []
    for(let i=0, l=copies.length; i<l; i++) {
      copies[i]()
    }
  }

  let handleNext = () => {
    if(typeof Promise !== 'undefined') {
      Promise.resolve().then(fireCallbacks)
    } else {
      setTimeout(fireCallbacks, 0)
    }
  }

  pending = true
  callbacks.push(cb)
  handleNext()
}

nextTick(() => {
  console.log(1)
})
console.log(2)
console.log(3)
console.log(4)
console.log(5)
console.log(6)
console.log(7)
