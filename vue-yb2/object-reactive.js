(function(g) {
  function defineReactive(data, key, val) {
    if(typeof val === 'object')
      new Observer(val)

    let dep = new Dep
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        dep.depend()
        return val
      },
      set(newVal) {
        val = newVal
        dep.notify()
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
      if(g.target) {
        this.addSub(g.target)
      }
    }
    notify() {
      const subs = this.subs.slice()
      for(let i=0, l=subs.length; i<l; i++)
        subs[i].update()
    }

  }

  function remove(arr, item) {
    if(arr.length) {
      const index = arr.indexOf(item)
      if(index > -1) {
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
      g.target = this
      let value = this.getter.call(this.vm, this.vm)
      g.target = undefined
      return value
    }

    update() {
      const oldValue = this.value
      this.value = this.get()
      this.cb.call(this.vm, this.value, oldValue)
    }
  }

  const bailRE = /[^\w.$]/

  function parsePath(path) {
    if(bailRE.test(path)) {
      return
    }
    const segments = path.split('.')
    return function(obj) {
      for (let i=0; i<segments.length; i++) {
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
      for(let i=0; i<keys.length; i++)
        defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  let ob = {
    user: {
      name: ''
    }
  }

  new Observer(ob)
  new Watcher(ob, 'user.name', (newVal, oldVal) => {
    console.log('new Val: ', newVal)
    console.log('old Val: ', oldVal)
  })

  ob.user.name = 'zhang'
})(global)
