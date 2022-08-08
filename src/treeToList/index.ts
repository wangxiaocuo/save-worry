interface INode {
  [x: string]: any
}

interface IOptions {
  childrenField?: string
  withLevel?: boolean
  levelField?: string
  rootLevel?: number
  withPid?: boolean
  pidField?: string
  idField?: string
  rootPid?: string | number | undefined | null
}

/**
 * 树形数组转为扁平数组
 * @param {Array} tree - 树形数组
 * @param {Object} options - 配置选项
 */
function treeToList(
  tree: INode[] = [],
  options: IOptions = {
    childrenField: 'children',
    withLevel: false,
    levelField: '_level',
    rootLevel: 0,
    withPid: false,
    pidField: 'pid',
    idField: 'id',
    rootPid: undefined
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
  level?: number,
  pid?: string | number | undefined | null
) {
  options = options || {}

  const childrenField = options.childrenField || 'children'
  const _result = result || []
  const levelField = options.levelField || '_level'
  const _level = level || options.rootLevel || 0
  const pidField = options.levelField || 'pid'
  const idField = options.idField || 'id'
  const _pid = pid || options.rootPid || undefined

  tree.forEach(node => {
    const newNode = { ...node }
    delete newNode[childrenField]
    _result.push(newNode)

    if (options.withLevel) {
      newNode[levelField] = _level
    }
    if (options.withPid) {
      newNode[pidField] = _pid
    }

    node[childrenField] &&
      _processingTree(
        node[childrenField],
        options,
        _result,
        _level + 1,
        node[idField]
      )
  })
  return _result
}

export default treeToList
