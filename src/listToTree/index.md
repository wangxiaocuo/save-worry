---
order: 0
nav:
  title: 文档
  path: /functions
group:
  title: Tree
  order: 0
---

## 扁平数组转树 - listToTree

`listToTree(list [, options])`

- `list` - 必填项。扁平数组
- `options` - 可选项。配置选项
  - `options.idField` - 指定节点的索引字段为节点对象的某个属性值，默认为 `id`
  - `options.childrenField` - 指定节点的孩子为节点对象的某个属性值，默认为 `children`
  - `options.parentField` - 指定节点的父级为节点对象的某个属性值，默认为 `pid`
  - `options.rootPId` - 根级节点的父级 ID，此为是否是根级节点的判断依据，默认为 `undefined`
  - `options.withLevel` - 是否在节点中标记当前节点的层级
  - `options.levelField` - `withLevel` 为 `true` 时有效。指定节点的层级为节点对象的某个属性值，默认为 `_level`

### 示例

```js
import { listToTree } from 'save-worry'

const list = [
  {
    id: 1,
    title: '节点1'
  },
  {
    id: 2,
    title: '节点2'
  },
  {
    id: 3,
    title: '节点3'
  },
  {
    id: 11,
    pid: 1,
    title: '节点1-1'
  },
  {
    id: 12,
    pid: 1,
    title: '节点1-2'
  },
  {
    id: 31,
    pid: 3,
    title: '节点3-1'
  },
  {
    id: 32,
    pid: 3,
    title: '节点3-2'
  },
  {
    id: 311,
    pid: 31,
    title: '节点3-1-1'
  }
]

listToTree(list)
// 结果如下：
// [
//   {
//     id: 1,
//     title: '节点1',
//     children: [
//       { id: 11, pid: 1, title: '节点1-1', children: [] },
//       { id: 12, pid: 1, title: '节点1-2', children: [] }
//     ]
//   },
//   { id: 2, title: '节点2', children: [] },
//   {
//     id: 3,
//     title: '节点3',
//     children: [
//       {
//         id: 31,
//         pid: 3,
//         title: '节点3-1',
//         children: [{ id: 311, pid: 31, title: '节点3-1-1', children: [] }]
//       },
//       { id: 32, pid: 3, title: '节点3-2', children: [] }
//     ]
//   }
// ]
```
