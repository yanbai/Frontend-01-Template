# setup
-00:20:00


# render前储存vdom element appendchild改到mountTo
00：20-00:29
paint flush 看重绘区域

# diff
00:33:00
00:37 react做了全局的事件代理

# 先比type props isSameTree, isSameNode
00：41 - 00:56

# 再比children
00:56-01:24
00:59 处理递归 replace

# update 写进element wrapper
01:30 - 02:02

# yb question
如何分辨click事件没有变化
答案 01：19
全局事件代理 用strigify
