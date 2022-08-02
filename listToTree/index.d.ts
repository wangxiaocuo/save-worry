interface INode {
    [x: string]: any;
}
interface IOptions {
    idField?: string;
    childrenField?: string;
    parentField?: string;
    rootPId?: string | number | undefined | null;
    withLevel?: boolean;
    levelField?: string;
    rootLevel?: number;
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
declare function listToTree(list?: INode[], options?: IOptions): INode;
export default listToTree;
