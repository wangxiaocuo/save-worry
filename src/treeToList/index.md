---
order: 1
nav:
  title: 文档
  path: /functions
group:
  title: Tree
---

## 树转扁平数组 - treeToList

`treeToList(tree [, options])`

- `tree` - 必填项。树形数组
- `options` - 可选项。配置选项
  - `options.childrenField` - 指定节点的孩子为节点对象的某个属性值，默认为 `children`
  - `options.withLevel` - 是否在节点中标记当前节点的层级
  - `options.levelField` - `withLevel` 为 `true` 时有效。指定节点的层级为节点对象的某个属性值，默认为 `_level`
  - `options.rootLevel` - 根级节点的初始层级，默认为 0

### 示例

```js
import { treeToList } from 'save-worry'

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

treeToList(tree)
// 结果如下：
// [
//   { id: 1, title: '节点1' },
//   { id: 11, pid: 1, title: '节点1-1' },
//   { id: 12, pid: 1, title: '节点1-2' },
//   { id: 2, title: '节点2' },
//   { id: 3, title: '节点3' },
//   { id: 31, pid: 3, title: '节点3-1' },
//   { id: 311, pid: 31, title: '节点3-1-1' },
//   { id: 32, pid: 3, title: '节点3-2' }
// ]
```
