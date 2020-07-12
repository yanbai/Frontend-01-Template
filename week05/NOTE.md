# 周四 5.7
## Realm
```md
JS Context => Realm
宏任务
微任务 promise
函数调用 execution context
语句/声明
表达式
直接量 变量 this
```
## execution context
```md
scope definition in MDN
https://developer.mozilla.org/en-US/docs/Glossary/Scope

scope = The current context of execution
```

```md
code evaluation state(async await generator)
function
script or module
generator

function *foo() {
    yield 1
    yield 2
    yield 3
}

realm
lexical environment
    this
    super
    new.target
    变量

variableEnvironment (run time)
    var
    eval
    with
```

## closure

```md
#
let a = new Array
from lexical environment
```


## browser

## 优秀作业
在07-2开头提到
lynhao week05 realm.html
g6包做可视化
广搜
