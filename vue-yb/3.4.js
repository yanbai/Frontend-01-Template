// 将拦截器方法挂载到数组的属性上
import { arrayMethods } from './array'

const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export class Observer {
  constructor(value) {
    this.value = value
    // add
    this.dep = new Dep()
    // add
    def(value, '__ob__', this)

    if(Array.isArray(value)) {
      const augment = hasProto ? protoAugment : copyAugment
      augment(value, arrayMethods, arrayKeys)
    } else {
      this.walk(value)
    }
  }
  // ...
}

function protoAugment(target, src, keys) {
  target.__proto__ = src
}

function copyAugment(target, src, keys) {
  for (let i=0, l=keys.length; i<l; i++) {
    const key = key[i]
    def(target, key, src[key])
  }
}
