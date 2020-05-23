# 每周总结可以写在这里
1. Learn more about regular expression, and how to organize complex regexp rule

2. Learn more about code point and encoding

reference: 
http://www.fileformat.info/index.htm
http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html


# 4.16 语言通识

"a"

"b"

BNF(巴克斯)

<Number> = "0" | "1" | "2" | ... | "9"

<Decimal> = "0" | (("1" | "2" | ... | "9") <Number>+)

<ADD> = <Decimal> | <ADD> "+" <Decimal>

<MULTIPLE> = <Decimal> | <MULTIPLE> "+" <Decimal>

1+2*3
<ADD> = <MULTIPLE> | <ADD> "+" <MULTIPLE>

<logic> = <add> | 
    <logic> "||" <add> |
    <logic> "&&" <add>

终结符：+ - * /
非终结符: ADD MULTIPLE
