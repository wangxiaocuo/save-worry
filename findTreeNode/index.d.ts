interface INode {
    [x: string]: any;
}
interface IOptions {
    multiple?: boolean;
    childrenField?: string;
}
/**
 * 查找树节点
 * @param {Array} tree - 树形数组
 * @param {Function} func - 回调函数，用于判断节点是否命中。返回值必须为 boolean 类型，为 true 则表示，该节点命中
 * @param {Object} options - 配置选项
 * @param {String} options.multiple - 是否多选
 * @param {String} options.childrenField - 指定节点的孩子为节点对象的某个属性值，默认为 children
 */
declare function findTreeNode(tree: INode[], func: (node: INode) => boolean, options?: IOptions): INode | null;
export default findTreeNode;
