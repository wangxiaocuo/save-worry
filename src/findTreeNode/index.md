---
order: 3
nav:
  title: 文档
  path: /functions
group:
  title: Tree
---

## 查找树节点 - findTreeNode

查找符合条件的一个或多个树节点。

`findTreeNode(tree, func [, options])`

- `tree` - 必填项。树形数组
- `func` - 必填项。回调函数，用于判断节点是否命中。返回值必须为 `boolean` 类型，为 `true` 则表示，该节点命中
- `options` - 可选项。配置选项
  - `options.multiple` - 是否多选
  - `options.childrenField` - 指定节点的孩子为节点对象的某个属性值，默认为 `children`

### 示例

```js
import { findTreeNode } from '@wangxiaocuo/save-worry'

const tree = [
  {
    id: 1,
    title: '节点1',
    children: [
      { id: 11, pid: 1, title: '节点1-1' },
      { id: 12, pid: 1, title: '节点1-2' }
    ]
  },
  { id: 2, title: '节点2' },
  {
    id: 3,
    title: '节点3',
    children: [
      {
        id: 31,
        pid: 3,
        title: '节点3-1',
        children: [{ id: 311, pid: 31, title: '节点3-1-1' }]
      },
      { id: 32, pid: 3, title: '节点3-2' }
    ]
  }
]

findTreeNode(tree, node => node.title === '节点1-2')
// 结果如下：
// { id: 12, pid: 1, title: '节点1-2' }

// 查找所有 节点1 开头的节点
findTreeNode(tree, node => node.title.match(new RegExp('^节点1')), {
  multiple: true
})
// 结果如下
// [
//   {
//     id: 1,
//     title: '节点1',
//     children: [
//       { id: 11, pid: 1, title: '节点1-1' },
//       { id: 12, pid: 1, title: '节点1-2' }
//     ]
//   },
//   { id: 11, pid: 1, title: '节点1-1' },
//   { id: 12, pid: 1, title: '节点1-2' }
// ]
```
