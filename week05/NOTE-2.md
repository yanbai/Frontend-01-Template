# 周六 5.9

# http是ietf做的标准化
https://tools.ietf.org/html/rfc2616
这是http1.1的版本 150页左右 比http2.0的版本轻量 相对比较省力气

NODE document
https://nodejs.org/docs/latest-v12.x/api/net.html

# 请求标准
example:
POST / HTTP/1.1
HOST: 127.0.0.1
Content-Type: application/x-www-form-urlencoded

field1=aaa&code=x%3D1

# 标准解释
request line:
method path httpVersion
POST / HTTP/1.1

比如cn.bing.com/search?
path是search


headers:
HOST: 127.0.0.1
Content-Type: application/x-www-form-urlencoded

body:
field1=aaa&code=x%3D1


# TCP有三次握手 我们要找一个事件
event connect

# 第二段视频00:20开始带着我们写client

# 第二段视频00:45开始写requet对象
参考xmlhttprequest
method, url=host+port+path

conten-type:
application/x-www-form-urlencoded
myltipart
xml
application/json

constructor
tostring
send

# 第二段视频1：20 开始写response对象

# response example

status line:
HTTP/1.1 200 OK

headers:
content-type
date
connection
transfer-encoding: chunked

body:
26
<html><body>hello world</body></html>

0


# 状态机parse流

data事件触发条件
buffer满了 客户端从网卡接数据 有可能满 比如分配了10k的空间
服务端ip包 只保证包的顺序 不缺行每个包大小
这是面试中常见的chunck on data 粘包
