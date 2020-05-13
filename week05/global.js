// https://g6.antv.vision/en
let set = new Set()
let queue = [
    infinity,
    eval,
    Math
]

let current
while(queue.length) {
    current = queue.shift()
    if(set.has(current.object))
        continue
    set.add(current.object)

    for(let k of Object.getOwnPropertyNames(current.object)) {
        let property = Object.getOwnPropertyDescriptor(current.object, k)
        if(property.hasOwnProperty("value") && current[k] instanceof Object) {
            queue.push({
                object: property.value,
                path: current.path.concat([k])
            })
        }
        if(property.hasOwnProperty("getter")) {
            queue.push({
                object: property.getter,
                path: current.path.concat([k])
            })
        }

        if(property.hasOwnProperty("setter")) {
            queue.push({
                object: property.setter,
                path: current.path.concat([k])
            })
        }
    }
}