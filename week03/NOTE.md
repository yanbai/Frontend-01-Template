Thu 4.23 THU digest 基本类型
# 0:00-0:20 浮点数在bit中的储存 64bit 实际上是week2的补充

## background 二进制数组

### 1. ArrayBuffer

ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区（binary data buffer）。

它是一个字节数组，通常在其他语言中称为“byte array”。

你不能直接操作 ArrayBuffer 的内容，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

### 2. TypedArray

一个类型化数组（TypedArray）对象描述了一个底层的二进制数据缓冲区（binary data buffer）的一个类数组视图（view）
```bash
Int8Array 8位有符号整数的数组 一个元素代表一个字节
Uint8Array 8位无符号整型数组 一个元素代表一个字节

Int16Array
Uint16Array

Int32Array
Uint32Array

Float32Array
Float64Array
```
### 3. DataView

自定义复合格式视图

### 4. 很多浏览器操作的 API，用到了二进制数组操作二进制数据，下面是其中的几个。

File API

XMLHttpRequest

Fetch API

Canvas

WebSockets

### 5. for example: XMLHttpRequest
```bash
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.example.com/', true);
xhr.responseType = 'arraybuffer';
xhr.onload = function(e) {
    buffer = xhr.response;
    console.log(buffer)
};
xhr.send();
```
```bash
ArrayBuffer(7234) {}
[[Int8Array]]: Int8Array(7234) [60, 33, 68, 79, 67, 84, 89, 80, 69, 32, 104, 116, 109, 108, 62, 10, 60, 33, 45, 45, 91, 105, 102, 32, 73, 69, 32, 54, 93, 62, 60, 104, 116, 109, 108, 32, 99, 108, 97, 115, 115, 61, 34, 105, 101, 32, 108, 116, 45, 105, 101, 56, 34, 62, 60, 33, 91, 101, 110, 100, 105, 102, 93, 45, 45, 62, 10, 60, 33, 45, 45, 91, 105, 102, 32, 73, 69, 32, 55, 93, 62, 60, 104, 116, 109, 108, 32, 99, 108, 97, 115, 115, 61, 34, 105, 101, 32, 108, 116, 45, …]
[[Int16Array]]: Int16Array(3617) [8508, 20292, 21571, 20569, 8261, 29800, 27757, 2622, 8508, 11565, 26971, 8294, 17737, 13856, 15965, 26684, 28020, 8300, 27747, 29537, 15731, 26914, 8293, 29804, 26925, 14437, 15906, 8508, 25947, 25710, 26217, 11613, 15917, 15370, 11553, 23341, 26217, 18720, 8261, 23863, 15422, 29800, 27757, 25376, 24940, 29555, 8765, 25961, 27680, 11636, 25961, 8760, 15422, 23329, 28261, 26980, 23910, 11565, 2622, 8508, 11565, 26971, 8294, 17737, 14368, 15965, 26684, 28020, 8300, 27747, 29537, 15731, 26914, 8293, 25961, 8760, 15422, 23329, 28261, 26980, 23910, 11565, 2622, 8508, 11565, 26971, 8294, 17737, 14624, 15965, 26684, 28020, 8300, 27747, 29537, 15731, 26914, 8293, 25961, 8761, …]
[[Uint8Array]]: Uint8Array(7234) [60, 33, 68, 79, 67, 84, 89, 80, 69, 32, 104, 116, 109, 108, 62, 10, 60, 33, 45, 45, 91, 105, 102, 32, 73, 69, 32, 54, 93, 62, 60, 104, 116, 109, 108, 32, 99, 108, 97, 115, 115, 61, 34, 105, 101, 32, 108, 116, 45, 105, 101, 56, 34, 62, 60, 33, 91, 101, 110, 100, 105, 102, 93, 45, 45, 62, 10, 60, 33, 45, 45, 91, 105, 102, 32, 73, 69, 32, 55, 93, 62, 60, 104, 116, 109, 108, 32, 99, 108, 97, 115, 115, 61, 34, 105, 101, 32, 108, 116, 45, …]
byteLength: 7234
__proto__: ArrayBuffer
byteLength: 7234
constructor: ƒ ArrayBuffer()
slice: ƒ slice()
Symbol(Symbol.toStringTag): "ArrayBuffer"
get byteLength: ƒ byteLength()
__proto__: Object
```
responseType by default是text, 此外还有"arraybuffer"、"blob"或"document"
text是document字符串
document是js原生节点的document

### 6. 位移运算符
```md
移位运算就是对二进制进行有规律低移位，移位运算可以设计很多奇妙的效果，在图形图像编程中应用广泛。
"<<"
左移，符号位不变，右侧空出位置，填充为0，超出32位则丢弃
console.log(5 << 2) //20
左移 数变大
00000000 00000000 00000000 00000101 << 2 //5
00000000 00000000 00000000 00010100      //20

">>"
右移，左侧空出位置，填充为符号位，超出的值丢弃
console.log(1000 >> 8) //3
右移数变小，实际上是绝对值变小
00000000 00000000 00000011 11101000 << 8 //1000
00000000 00000000 00000000 00000011      //3

console.log(-1000 >> 8) //-4
负数右移 绝对值变小
11111111 11111111 11111100 00011000 >> 8 //-1000
11111111 11111111 11111111 11111100      //-4

">>>" 待研究
```
## digest
### 1. application code
```bash
data() {
    return {
        bits: Array(65).join(0).split("").map(v => Number(v))
    }
},
watch: {
    bits(val) {
        const bytes = new Uint8Array(8)
        const memory = new Float64Array(bytes.buffer)
        for(let i=0; i<8; i++) {
            var byte = 0
            for(let j=0; j<8; j++) {
                byte = byte << 1
                byte != Number(val[i * 8 + j])
                console.log(byte, val[i * 8 + j])
            }
            console.log("byte", byte)
            console.log(7 - i) = byte
            // i=0时 设置7的位置 反排, 第一个字节在i=7的位置
        }
        this.value = memory[0]
    },
    value(val) {
        const bytes = Uint8Array(8)
        const memory = new Float64Array(bytes.buffer)
        memory[0] = (val)
        console.log("******")
        for(var i=0; i<8; i++) {
            var byte = bytes[i]
            console.log(byte)
            for(var j=0; j<8; j++) {
                this.bits[(8-i)*8 - j - 1] = byte & 1
                byte = byte >> 1
                // 移位和位运算实现数字转比特位
            }
        }
    }
}
```
### 2. IE754?

### 3. +0 -0
```bash
function checkZero(zero) {
    if(1/zero === Infinity) {
        return 1
    }
    if(1/zero === -Infinity) {
        return -1
    }
}
checkZero(0) //0
checkZero(-0) //-1
```
```bash
function sign(number) {
    return number / Math.abs(number)
}
sign(1) //1
sign(100) //-1
sign(-100) //-1
sign(0) //NaN

这种写法不好

最好
function sign(number) {
    res = checkZero(number) // check zero
    res = checkInfinity(number) // check infinity
    return number / Math.abs(number)
}
```

### 4. 除尽
```md
对于二进制小数，如果不断*2之后可以转化成整数，则可以除尽，不会有精度丢失
0.5 可以除尽
0.2 不可以除尽
0.1 不可以除尽
对于十进制小数，如果不断*10之后可以转化成整数，则可以除尽
如 0.1 0.2可以除尽，没有精度丢失
0.3333333...不可以除尽，有精度丢失
```
### 5. 第一位是1
```md
对于整数 所有整数 二进制第一位都是1
6: 110
5: 101
4: 100
3: 11
2: 10
1: 1

0.5=2^-1, 就是二进制数10的-1次方，第一位也是1
0.2=2^xxxx 就是二进制数10的xxxx次方，第一位也是1
所有数第一位都是1
```
### 6. 1.3+1.1-2.4 < ebsilon 失效
```md
1.3转2进制浮点数有精度损失
1.1转2进制浮点数有精度损失
2.4转2进制浮点数有精度损失
加法有精度丢失
减法有精度丢失

不能用ebsilon判断运算
要自己创造一个精度损失判断
```
### 7. 1.1*10 比 1.1+1.1 精度损失大

### 8. 小数会存成64bit浮点数

# JS expression Grammer Runtime

# 130：00 - 160:00 lead us coding
convertStringToNumber
convertNumberToString

# 160:00 - ending Q&A
```md
byte = byte<<1 左移放大 相当于乘以一个x(这里x为2)，应用场景： "123" 转 123， 或者 0.123 取 123(小数数字转string)
byte = byte<<1 右移缩小 相当于除以一个x(这里x为2)，应用场景 "123" 转 0.123(小数string转数字)
参考stringtonumber numbertostring

正则实际上设计本意是有限状态机
不适合做有回溯的match 性能不好
后面做模板engine会用到状态机
```
## 十进制转二进制
```js
var num = 100;
console.log(num.toString(2));
语法
NumberObject.toString(radix);
```
## 二进制转十进制
```js
var num = 1100100;
console.log(parseInt(num,2));
语法
parseInt(string, radix);

parseInt(num,8);   //八进制转十进制
parseInt(num,16);   //十六进制转十进制
parseInt(num).toString(8)  //十进制转八进制
parseInt(num).toString(16)   //十进制转十六进制
parseInt(num,2).toString(8)   //二进制转八进制
parseInt(num,2).toString(16)  //二进制转十六进制
parseInt(num,8).toString(2)   //八进制转二进制
parseInt(num,8).toString(16)  //八进制转十六进制
parseInt(num,16).toString(2)  //十六进制转二进制
parseInt(num,16).toString(8)  //十六进制转八进制
```
