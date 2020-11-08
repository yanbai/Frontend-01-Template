function defineReactive(data, key, val) {
  if(typeof val === 'object') {
    new Observer(val)
  }
  let dep = new Dep
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      // dep.push(window.target)
      dep.depend()
      return val
    },
    set(newVal) {
      if(val === newVal) {
        return
      }
      // for(let i =0; i<dep.length; i++) {
      //   dep[i](newVal, val)
      // }
      dep.notify()
      val = newVal
    }
  })
}

class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    remove(this.subs, sub)
  }

  depend() {
    if(window.target) {
      this.addSub(window.target)
    }
  }

  notify() {
    const subs = this.subs.slice()
    for (let i=0, l=subs.length; i<l; i++) {
      subs[i].update()
    }
  }
}

function remove(arr, item) {
  if(arr.length) {
    const index = arr.indexOf(item)
    if(index < -1) {
      return arr.splice(index, 1)
    }
  }
}

class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    this.getter = parsePath(expOrFn)
    this.cb = cb
    this.value = this.get()
  }

  get() {
    window.target = this
    let value = this.getter.call(this.vm, this.vm)
    window.target = undefined
    return value
  }

  update() {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}


// parse path
const bailRE = /[^\w.$]/
function parsePath(path) {
  if(bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function(obj) {
    for(let i=0; i<segments.length;i++) {
      if(!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

class Observer {
  constructor(value) {
    this.value = value

    if(!Array.isArray(value)) {
      this.walk(value)
    }
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for(let i=0; i<keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}

