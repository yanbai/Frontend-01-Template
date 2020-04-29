# 9.1 一般对象内置方法和插槽
## 内置slot [[prototype]]
- [[Protorype]]对象的data properties会被继承，作为子对象的可见属性，并且可以被get访问，但是无法被set访问
- [[Protorype]]对象的accessor propertie are inherited for both get access and set access

## 内置slot [[Extensible]]
false时，对象无法增加属性，无法更改内置slot[[Protorype]]的值，也无法改为true

## 内置方法
Each ordinary object internal method delegates to a similarly-named abstract operation. If such an abstract operationdepends on another internal method, then the internal method is invoked on O rather than calling the similarly-namedabstract operation directly. These semantics ensure that exotic objects have their overridden internal methods invokedwhen ordinary object internal methods are applied to them.
内置方法委托给抽象操作(abstract operation)，即正常会以抽象操作的形态来调用内部方法
如果抽象操作调用另一个内部方法，那么内部方法不会直接调用抽象操作
这样一般对象的内置方法调用特殊对象的特殊方法时，会调用特殊对象方法的重写

- [[GetPrototypeOf]]
- [[SetPrototypeOf]]
- [[IsExtensible]]
- [[PreventExtensions]]
- [[GetOwnProperty]]
- [[DefineOwnProperty]]
- [[HasProperty]]
- [[Get]]
- [[Set]]
- [[Delete]]
- [[OwnPropertyKeys]]

# 9.2 Function对象

## 内置slot
- [[Environment]]
- [[FormalParameters]]
- [[FunctionKind]]
- [[ECMAScriptCode]]
- [[ConstructorKind]]
- [[Realm]]
- [[ScriptOrModule]]
- [[ThisMode]]
- [[Strit]]
- [[HomeObject]]
- [[SourceText]]

## 内置方法
- [[Call]]
- [[Construct]]

# 9.3 Exotic Objects
## Bound Function Objects
### slot
- [[BoundTargetFunction]] 函数对象
- [[BoundThis]] this的值
- [[BoundArguments]]

### methods
- [[Call]]
- [[Construct]]



## Array Exotic Objects
```bash
special properties:
array index
有效的index必须是 ToSting(ToUnit32(P)) === P 且必须不等于 2^32-1
length
non-configurable
```
### methods:
- [[DefineOwnProperty]]


## String Exotic Objects
### methods:
- [[GetOwnProperty]]
- [[DefineOwnProperty]]
- [[OwnPropertyKeys]]


## Arguments Exotic Objects
### methods:
- [[GetOwnProperty]]
- [[DefineOwnProperty]]
- [[Get]]
- [[Set]]
- [[Delete]]

## Integer Indexed Exotic Objects
### methods:
- [[GetOwnProperty]]
- [[HasProperty]]
- [[DefineOwnProperty]]
- [[Get]]
- [[Set]]
- [[OwnPropertyKeys]]


## Module Namespace Exotic Objects
```bash
Module Namespace Exotic Objects(MNEO)是公开从ECMAScript模块导出的绑定的外来对象(See15.2.3)。
模块命名空间外来对象的字符串键控自身属性与模块导出的绑定名称之间存在一对一的对应关系。
导出的绑定包括使用export *export项间接导出的任何绑定。
每个字符串值自己的属性键是相应导出绑定名的StringValue。
这些是模块命名空间外来对象惟一的字符串键控属性。
每个这样的属性有{[[Writable]]: true， [[Enumerable]]: true，[[可配置的]]:false}。
MNEO是不可扩展的。
```
### slots:
- [[Module]]
- [[Exports]]
- [[Prototype]]

### methods:
- [[SetPrototypeOf]]
- [[IsExtensible]]
- [[PreventExtensions]]
- [[GetOwnProperty]]
- [[DefineOwnProperty]]
- [[HasProperty]]
- [[Get]]
- [[Set]]
- [[Delete]]
- [[OwnPropertyKeys]]

## Immutable Prototype Exotic Objects
```bash
Immutable Prototype Exotic Objects是一个特殊对象，它有一个[[prototype]] slot，这个slot在初始化后不会改变

Immutable Prototype Exotic Objects具有与普通对象相同的internal slots, 只有下面的内置methods比较特殊
```
### methods:
- [[SetPrototypeOf]]

# Proxy Object Internal Methods and Internal Slots
## undone