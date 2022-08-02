interface INode {
  [x: string]: any
}

interface IOptions {
  multiple?: boolean
  childrenField?: string
}

/**
 * 查找树节点
 * @param {Array} tree - 树形数组
 * @param {Function} func - 回调函数，用于判断节点是否命中。返回值必须为 boolean 类型，为 true 则表示，该节点命中
 * @param {Object} options - 配置选项
 * @param {String} options.multiple - 是否多选
 * @param {String} options.childrenField - 指定节点的孩子为节点对象的某个属性值，默认为 children
 */
function findTreeNode(
  tree: INode[],
  func: (node: INode) => boolean,
  options: IOptions = {
    multiple: false,
    childrenField: 'children'
  }
): INode | null {
  if (!tree) return []

  if (!Array.isArray(tree)) {
    throw new Error('The first parameter "tree" must be an array type.')
  }

  options = options || {}

  if (!options.multiple) {
    return findTreeNodeSingle(tree, func, options)
  } else {
    return findTreeNodeMultiple(tree, func, options)
  }
}

/**
 * 查找单个节点
 */
function findTreeNodeSingle(
  tree: INode[],
  func: (node: INode) => boolean,
  options: IOptions = {
    childrenField: 'children'
  }
) {
  const childrenField = options.childrenField || 'children'

  for (const node of tree) {
    if (func(node)) return node
    if (node[childrenField]) {
      const res: INode | null = findTreeNode(node[childrenField], func, options)
      if (res) return res
    }
  }
  return null
}

/**
 * 查找多个节点
 */
function findTreeNodeMultiple(
  tree: INode[],
  func: (node: INode) => boolean,
  options: IOptions = {
    childrenField: 'children'
  },
  result: INode[] = []
) {
  const childrenField = options.childrenField || 'children'

  for (const node of tree) {
    if (func(node)) result.push(node)
    if (node[childrenField]) {
      const res: INode[] | null = findTreeNodeMultiple(
        node[childrenField],
        func,
        options
      )
      if (res) result.push(...res)
    }
  }
  return result
}

export default findTreeNode
