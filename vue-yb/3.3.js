// 使用拦截器覆盖 array 原型

export class Observer {
  constructor(value) {
    this.value = value

    if(Array.isArray(value)) {
      // add
      value.__proto__ = arrayMethods
    } else {
      this.walk(value)
    }
  }
  // ...
}
