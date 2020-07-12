6.6
# HTML
https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
<!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->
<!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->
<!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->
<!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->

white-sppace: pre-wrap 可以让空格不合并
nbsp 00A0

namespace代表你能用哪些标签
## 语义

## 合法元素
element
text
comment
documentType
processingInstruction
CDATA

## 字符引用
&#161
&amp
&lt
&gt
&quot;

# DOM

w3c文档

element
  html
  svg
document
characterdata
  text
  comment
  processingInstrution
docuemntFragment
DocumentType

## 导航类操作
  parentNode
  childNodes
  firstChild
  lastChild
  nextSibling
  previousSibling
## 修改操作
  appendChild
  insertBefore
  removeChild
  replaceChild

## 高级
  compareDocumentPosition
  contains
  isEqualNode
  isSameNode ===
  cloneNode (true 深拷贝)

DOM
  dom tree
  event
  range
