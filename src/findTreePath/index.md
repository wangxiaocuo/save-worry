---
order: 4
nav:
  title: 文档
  path: /functions
group:
  title: Tree
---

## 查找树的路径 - findTreePath

查找符合条件的一个或多个树路径。

`findTreePath(tree, func [, options])`

- `tree` (Array)： 必填项。树形数组
- `func` (Function)：必填项。回调函数，用于判断节点是否命中。返回值必须为 boolean 类型，为 true 则表示，该节点命中
- `options` (Object)：可选配置选项
  - `options.setPathNodeAsSelf` (boolean)：是否设置路径节点为自己，如果是 `false`，则输出 `id` 数组
  - `options.multiple` (boolean)：是否多选
  - `options.idField` (string)：指定节点的索引 字段为节点对象的某个属性值，默认为 `id`
  - `options.childrenField` (string)：指定节点的孩子为节点对象的某个属性值，默认为 `children`

### 示例

```js
import { findTreePath } from 'save-worry'

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

findTreePath(tree, node => node.title === '节点1-2')
// 结果如下：
// [1,12]

// 设置路径节点为自己
findTreePath(tree, node => node.title === '节点1-2', {
  setPathNodeAsSelf: true
})
// 结果如下：
// [
//   {
//     id: 1,
//     title: '节点1',
//     children: [
//       { id: 11, pid: 1, title: '节点1-1' },
//       { id: 12, pid: 1, title: '节点1-2' }
//     ]
//   },
//   { id: 12, pid: 1, title: '节点1-2' }
// ]

// 查找所有 节点1 开头的节点路径
findTreePath(tree, node => node.title.match(new RegExp('^节点1')), {
  multiple: true
})
// 结果如下：
// [[1],[1,11],[1,12]]
```
