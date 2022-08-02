interface INode {
    [x: string]: any;
}
interface IOptions {
    setPathNodeAsSelf?: boolean;
    multiple?: boolean;
    idField?: string;
    childrenField?: string;
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
declare function findTreePath(tree: INode[], func: (node: INode) => boolean, options?: IOptions): any[];
export default findTreePath;
