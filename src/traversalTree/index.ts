interface INode {
  [x: string]: any
}

interface IOptions {
  mode?: string
  childrenField?: string
}

/**
 * 遍历树形数组
 * @param {Array} tree - 树形数组
 * @param {Function} func - 回调函数，用于判断节点是否需要保留。返回值必须为 boolean 类型，为 true 则表示，该节点需要被保留
 * @param {Object} options - 配置选项
 */
function traversalTree(
  tree: INode[],
  func: (node: INode) => boolean,
  options: IOptions = {
    mode: 'BF',
    childrenField: 'children'
  }
) {
  if (!tree) return

  if (!Array.isArray(tree)) {
    throw new Error('The first parameter "tree" must be an array type.')
  }

  options = options || {}

  options.mode = ['BF', 'DF-NLR', 'DF-LRN'].includes(options.mode || '')
    ? options.mode
    : 'BF'
  if (options.mode === 'BF') {
    return traversalTreeBF(tree, func, options)
  } else {
    return traversalTreeDF(tree, func, options)
  }
}

/**
 * 遍历树形数组 - 广度优先
 */
function traversalTreeBF(
  tree: INode[],
  func: (node: INode) => boolean,
  options: IOptions = {
    childrenField: 'children'
  }
) {
  const list = [...tree]
  let node
  const childrenField = options.childrenField || 'children'
  while ((node = list.shift())) {
    func(node)
    node[childrenField] && list.push(...node[childrenField])
  }
}

/**
 * 遍历树形数组 - 深度优先
 */
function traversalTreeDF(
  tree: INode[],
  func: (node: INode) => boolean,
  options: IOptions = {
    mode: 'DF-NLR',
    childrenField: 'children'
  }
) {
  const childrenField = options.childrenField || 'children'
  if (options.mode === 'DF-NLR') {
    // 先序遍历
    tree.forEach(node => {
      func(node)
      node[childrenField] && traversalTreeDF(node[childrenField], func)
    })
  } else {
    // 后序遍历
    tree.forEach(node => {
      node[childrenField] && traversalTreeDF(node[childrenField], func)
      func(node)
    })
  }
}

export default traversalTree
