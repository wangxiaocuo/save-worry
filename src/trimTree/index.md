---
order: 5
nav:
  title: 文档
  path: /functions
group:
  title: Tree
---

## 修剪树形数组 - trimTree

修剪树形数组，只保留符合条件的枝桠。

`trimTree(tree, func [, options])`

- `tree` - 必填项。树形数组
- `func` - 必填项。回调函数，用于判断节点是否需要保留。返回值必须为 `boolean` 类型，为 `true` 则表示，该节点需要被保留
- `options` - 可选项。配置选项
  - `options.childrenField` - 指定节点的孩子为节点对象的某个属性值，默认为 `children`

### 示例

```js
import { trimTree } from '@wangxiaocuo/save-worry'

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

trimTree(tree, node => node.title === '节点2' || node.title === '节点3-1')
// 结果如下：
// [
//   { id: 2, title: '节点2' },
//   {
//     id: 3,
//     title: '节点3',
//     children: [{ id: 31, pid: 3, title: '节点3-1', children: [] }]
//   }
// ]

trimTree(tree, node => new RegExp('^节点1').match(node.title))
// 结果如下：
// [{ id: 1, title: '节点1', children: [] }]
```
