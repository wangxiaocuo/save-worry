interface INode {
  [x: string]: any
}

interface IOptions {
  idField?: string
  childrenField?: string
  parentField?: string
  rootPId?: string | number | undefined | null
  withLevel?: boolean
  levelField?: string
  rootLevel?: number
}

/**
 * 扁平数组转为树形数组
 * @param {Array} list - 扁平数组
 * @param {Object} options - 配置选项
 * @param {String} options.idField - 指定节点的索引 字段为节点对象的某个属性值，默认为 id
 * @param {String} options.childrenField - 指定节点的孩子为节点对象的某个属性值，默认为 children
 * @param {String} options.parentField - 指定节点的父级为节点对象的某个属性值，默认为 pid
 * @param {String} options.rootPId - 根级节点的父级ID，此为是否是根级节点的判断依据，默认为 undefined
 * @param {String} options.withLevel - 是否在节点中标记当前节点的层级
 * @param {String} options.levelField - withLevel 为 true 时有效。指定节点的层级为节点对象的某个属性值，默认为 _level
 * @param {String} options.rootLevel - 根级节点的初始层级，默认为0
 */
function listToTree(
  list: INode[] = [],
  options: IOptions = {
    idField: 'id',
    childrenField: 'children',
    parentField: 'pid',
    rootPId: undefined,
    withLevel: false,
    levelField: '_level',
    rootLevel: 0
  }
): INode {
  if (!list) return []

  if (!Array.isArray(list)) {
    throw new Error('The first parameter "list" must be an array type.')
  }

  options = options || {}

  if (options.withLevel) {
    return _listToTreeWithLevel(
      list,
      options,
      options.rootPId,
      options.rootLevel || 0
    )
  }

  const idField = options.idField || 'id'
  const childrenField = options.childrenField || 'children'
  const parentField = options.parentField || 'pid'
  const { rootPId } = options

  let nodeMap = list.reduce((map, node) => {
    map[node[idField]] = node
    node[childrenField] = []
    return map
  }, {})
  return list.filter(node => {
    nodeMap[node[parentField]] &&
      nodeMap[node[parentField]][childrenField].push(node)
    return node[parentField] === rootPId
  })
}

/**
 * 扁平数组转为树形数组，并向节点中注入层级信息
 */
function _listToTreeWithLevel(
  list: INode[],
  options: IOptions,
  parentId: string | number | undefined | null,
  level: number
) {
  const idField = options.idField || 'id'
  const childrenField = options.childrenField || 'children'
  const parentField = options.parentField || 'pid'
  const levelField = options.levelField || '_level'

  const tree: INode = list
    .filter(node => node[parentField] === parentId)
    .map(node => {
      const children = _listToTreeWithLevel(
        list,
        options,
        node[idField],
        level + 1
      )
      return {
        ...node,
        [levelField]: level,
        [childrenField]: children
      }
    })
  return tree
}

export default listToTree
