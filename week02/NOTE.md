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



# 4.18 javascript atom
http://www.fileformat.info/index.htm
https://home.unicode.org/
inputElement
	Whitespace
	Linefeed
	Comment
	Token
		Punctator
		identifireName (start with 'aA')
			Keywords (for, let, var)
			Identifier
				Identifier reference(document) 不能和关键字重合
				属性名(write) 可以和关键字重合
			Future reserved keywords: enum
		Literal
			Number
				Runtime
				
				Sign (1)
				(8)
				(52)
				
				Grammar
				
				DecimalLiteral
					0
					0.
					.2
					1e3
				Binary
					0b
				Oct
					0o
					有的浏览支持 00开头表示八进制
				Hex
					Ox
					
				Practice
					Math.abs(0.1+0.2-0.3) <= Number.EPSILON
			String
				
				Character
				
				Point
					Ascii
					Unicode
					Ucs
					GB
					
				Encode
					UTF
					
					Function UTF8_Encoding(sr){
					  //return new Buffer();
					}

Number
String
Bool
...