# 5.14 有限状态机 HTML parser
## 有限状态机处理字符串
```md
每一个状态都是一个机器
    每个机器理 可以计算 store
    每个机器是纯函数

每个机器有确定的下一个状态 moore
每个机器根据输入决定下一个状态 meally
```
## 视频头一个小时 说了如何实现meally状态机
```md
function state(input) {
    return next // return next state
    // when next is static, its moore state
    // when next is if else, its meally state
}

while(input) {
    state = state
}
```
## 作业 1.abcabx 2.实现未知的pattern(KMP等效，时间复杂度m+n)
```md
https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm
有限状态机基本可以实现正则 * ? {2, 3}
```
## 第二个小时解析HTML转化成DOM树
```md
HTML标准直接用状态机解释 没有用产生式
https://html.spec.whatwg.org/multipage/
```
