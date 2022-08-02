interface INode {
  [x: string]: any
}

interface IOptions {
  setPathNodeAsSelf?: boolean
  multiple?: boolean
  idField?: string
  childrenField?: string
}

/**
 * 查找树路径
 * @param {Array} tree - 树形数组
 * @param {Function} func - 回调函数，用于判断节点是否命中。返回值必须为 boolean 类型，为 true 则表示，该节点命中
 * @param {Object} options - 配置选项
 * @param {String} options.setPathNodeAsSelf - 是否设置路径节点为自己，如果是 false，则设置 id 为路径节点
 * @param {String} options.multiple - 是否多选
 * @param {String} options.idField - 指定节点的索引 字段为节点对象的某个属性值，默认为 id
 * @param {String} options.childrenField - 指定节点的孩子为节点对象的某个属性值，默认为 children
 */
function findTreePath(
  tree: INode[],
  func: (node: INode) => boolean,
  options: IOptions = {
    setPathNodeAsSelf: false,
    multiple: false,
    idField: 'id',
    childrenField: 'children'
  }
) {
  if (!tree) return []

  if (!Array.isArray(tree)) {
    throw new Error('The first parameter "tree" must be an array type.')
  }

  options = options || {}

  if (!options.multiple) {
    return findTreePathSingle(tree, func, options)
  } else {
    return findTreePathMultiple(tree, func, options)
  }
}

/**
 * 查找单条路径
 */
function findTreePathSingle(
  tree: INode[],
  func: (node: INode) => boolean,
  options: IOptions = {
    setPathNodeAsSelf: false,
    childrenField: 'children'
  },
  path: any[] = []
) {
  const setPathNodeAsSelf = options.setPathNodeAsSelf
  const idField = options.idField || 'id'
  const childrenField = options.childrenField || 'children'

  for (const node of tree) {
    if (setPathNodeAsSelf) {
      path.push(node)
    } else {
      path.push(node[idField])
    }
    if (func(node)) return path
    if (node[childrenField]) {
      const childrenPath: any[] = findTreePathSingle(
        node[childrenField],
        func,
        options,
        path
      )
      if (childrenPath.length) return childrenPath
    }
    path.pop()
  }
  return []
}

/**
 * 查找多条路径
 */
function findTreePathMultiple(
  tree: INode[],
  func: (node: INode) => boolean,
  options: IOptions = {
    setPathNodeAsSelf: false,
    childrenField: 'children'
  },
  path: any[] = [],
  result: any[] = []
) {
  const setPathNodeAsSelf = options.setPathNodeAsSelf
  const idField = options.idField || 'id'
  const childrenField = options.childrenField || 'children'

  for (const node of tree) {
    if (setPathNodeAsSelf) {
      path.push(node)
    } else {
      path.push(node[idField])
    }
    func(node) && result.push([...path])
    node[childrenField] &&
      findTreePathMultiple(node[childrenField], func, options, path, result)
    path.pop()
  }
  return result
}

export default findTreePath
