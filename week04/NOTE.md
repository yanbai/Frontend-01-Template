# 结构化编程 微任务 宏任务

## 40 - 1:08，40分之前不用看
introduce 微任务, promise 队列
宏任务 可能是事件循环的两个节点 setimeout是事件循环的一种形式

then里面才是微任务 不对, 所有都是微任务
除了js引擎就是宏任务

微任务是js引擎内的执行队列
同步任务也是微任务

setimeout实际上是宿主环境的API ？如何证明？

微任务是为了then（promise）而实现的，但是并不是有then才有微任务
有then才有一个宏任务中出现多个微任务的情况
```bash
new Promise(resolve => resolve()).then(() => console.log('a'))

  a VMXXX
< Promise {<resolved>: undefined}
```

```bash
new Promise(resolve => resolve()).then(() => this.a = 3), function() { return this.a }

task1
job1: new Promise(resolve => resolve()).then(() => this.a = 3), function() { return this.a }
job2: this.a = 3

task2
return this.a
```

```bash

```