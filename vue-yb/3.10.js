// 侦测数组中元素变化
export class Observer {
  constructor(value) {
    this.value = value
    def(value, '__ob__', this)

    // add
    if(Array.isArray(value)) {
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  observeArray(items) {
    for (let i=0, l=items.length; i<l; i++) {
      observe(items[i])
    }
  }
  // ...
}
