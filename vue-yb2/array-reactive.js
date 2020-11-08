(function(g) {

  let arrayMethods = Object.create(Array.prototype)

  ;[
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'splice',
    'sort'
  ].forEach((method) => {
    const original = Array.prototype[method]

    def(arrayMethods, method, function mutator(...args) {
      const result = original.apply(this, args)
      const ob = this.__ob__

      let inserted
      switch (method) {
        case 'push':

          break;

        case 'unshift':
          inserted = args
          break;

        case 'splice':
          inserted = args.slice(2)
          break;

        default:
          break;
      }

      ob.dep.notify()
      return result
    })
  })


  class Observer {
    constructor(value) {
      this.value = value
      this.dep = new Dep
      def(value, '__ob__', this)
      if(Array.isArray(value)) {
        // value.__proto__ = arrayMethods
        this.observeArray(value)
      } else {
        this.walk(value)
      }
    }

    observeArray(items) {
      for(let i=0, l=items.length; i<l; i++) {
        observe(items[i])
      }
    }

    walk(obj) {
      const keys = Object.keys(obj)
      for(let i=0; i<keys.length; i++)
        defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  function observe(value, asRootData) {
    if(isObject(value))
      return
    let ob
    if(
      value.hasOwnProperty('__ob__') &&
      value.__ob__ instanceof Observer
    ) {
      ob = value.__ob__
    } else {
      ob = new Observer(value)
    }
    return ob
  }

  function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    })
  }

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

  let ob = {
    users: []
  }

  new Observer(ob.users)
  new Watcher(ob, 'users', (newVal, oldVal) => {
    console.log('new Val: ', newVal)
    console.log('old Val: ', oldVal)
  })

  ob.users.push('1')

})(global)
