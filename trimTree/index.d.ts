interface INode {
    [x: string]: any;
}
interface IOptions {
    childrenField?: string;
}
/**
 * 修剪树形数组
 * @param {Array} tree - 树形数组
 * @param {Function} func - 回调函数，用于判断节点是否需要保留。返回值必须为 boolean 类型，为 true 则表示，该节点需要被保留
 * @param {Object} options - 配置选项
 * @param {String} options.childrenField - 指定节点的孩子为节点对象的某个属性值，默认为 children
 */
declare function trimTree(tree: INode[], func: (node: INode) => boolean, options?: IOptions): INode[];
export default trimTree;
