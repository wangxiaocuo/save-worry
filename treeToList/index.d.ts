interface INode {
    [x: string]: any;
}
interface IOptions {
    childrenField?: string;
    withLevel?: boolean;
    levelField?: string;
    rootLevel?: number;
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
declare function treeToList(tree?: INode[], options?: IOptions): INode[];
export default treeToList;
