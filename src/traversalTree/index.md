---
order: 2
nav:
  title: 文档
  path: /functions
group:
  title: Tree
---

## 遍历树形数组 - traversalTree

遍历树形数组的每一个节点，每遍历一个节点，触发一下回调函数。支持不同的遍历模式。

`traversalTree(tree, func [, options])`

- `tree` (Array)：必填项。树形数组
- `func` (Function)：必填项。回调函数，回调参数为节点 `node`
- `options` (Object)：可选配置选项
  - `options.mode` (string)：遍历模式。可选取值为 `BF`（广度优先）、`DF-NLR`（深度优先-先序遍历）、`DF-LRN`（深度优先-后序遍历），默认为 `BF`
  - `options.childrenField` (string)：指定节点的孩子为节点对象的某个属性值，默认为 `children`

### 示例

```js
import { traversalTree } from 'save-worry'

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

// 广度优先遍历
traversalTree(tree, node => console.log(node.title))
// 结果如下：
// 节点1
// 节点2
// 节点3
// 节点1-1
// 节点1-2
// 节点3-1
// 节点3-2
// 节点3-1-1

// 后序遍历
traversalTree(tree, node => console.log(node.title), { mode: 'DF-LRN' })
// 结果如下：
// 节点1-1
// 节点1-2
// 节点1
// 节点2
// 节点3-1
// 节点3-1-1
// 节点3-2
// 节点3
```
