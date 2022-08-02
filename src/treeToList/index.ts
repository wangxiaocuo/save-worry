interface INode {
  [x: string]: any
}

interface IOptions {
  childrenField?: string
  withLevel?: boolean
  levelField?: string
  rootLevel?: number
}

/**
 * 树形数组转为扁平数组
 * @param {Array} tree - 树形数组
 * @param {Object} options - 配置选项
 * @param {String} options.dropChildren - 转为扁平数组时，节点中的 children 字段是否丢弃，默认为 false
 * @param {String} options.withLevel - 是否在节点中标记当前节点的层级
 * @param {String} options.levelField - withLevel 为 true 时有效。指定节点的层级为节点对象的某个属性值，默认为 _level
 * @param {String} options.rootLevel - 根级节点的初始层级，默认为0
 */
function treeToList(
  tree: INode[] = [],
  options: IOptions = {
    childrenField: 'children',
    withLevel: false,
    levelField: '_level',
    rootLevel: 0
  }
) {
  if (!tree) return []

  if (!Array.isArray(tree)) {
    throw new Error('The first parameter "list" must be an array type.')
  }

  return _processingTree(tree, options)
}

function _processingTree(
  tree: INode[] = [],
  options: IOptions,
  result?: INode[],
  level?: number
) {
  options = options || {}

  const childrenField = options.childrenField || 'children'
  const levelField = options.levelField || '_level'
  const _result = result || []
  const _level = level || options.rootLevel || 0

  tree.forEach(node => {
    const newNode = { ...node }
    delete newNode[childrenField]
    _result.push(newNode)
    if (options.withLevel) {
      node[levelField] = _level
    }
    node[childrenField] &&
      _processingTree(node[childrenField], options, _result, _level + 1)
  })
  return _result
}

export default treeToList
