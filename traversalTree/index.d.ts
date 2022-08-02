interface INode {
    [x: string]: any;
}
interface IOptions {
    mode?: string;
    childrenField?: string;
}
/**
 * 遍历树形数组
 * @param {Array} tree - 树形数组
 * @param {Function} func - 回调函数，用于判断节点是否需要保留。返回值必须为 boolean 类型，为 true 则表示，该节点需要被保留
 * @param {Object} options - 配置选项
 * @param {String} options.mode - 遍历模式。可选取值为 BF、DF-NLR、DF-LRN，BF:广度优先，DF-NLR:深度优先-先序遍历，DF-LRN:深度优先-后序遍历，默认为 BF
 * @param {String} options.childrenField - 指定节点的孩子为节点对象的某个属性值，默认为 children
 */
declare function traversalTree(tree: INode[], func: (node: INode) => boolean, options?: IOptions): void;
export default traversalTree;
