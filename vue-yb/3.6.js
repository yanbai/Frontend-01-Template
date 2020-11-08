// 依赖列表存在哪儿
export class Observer {
  constructor(value) {
    this.value = value
    // add
    this.dep = new Dep()

    if(Array.isArray(value)) {
      const augment = hasProto ? protoAugment : copyAugment
      augment(value, arrayMethods, arrayKeys)
    } else {
      this.walk(value)
    }
  }
  // ...
}
