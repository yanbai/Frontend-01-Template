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