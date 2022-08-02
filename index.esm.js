function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
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
function listToTree() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    idField: 'id',
    childrenField: 'children',
    parentField: 'pid',
    rootPId: undefined,
    withLevel: false,
    levelField: '_level',
    rootLevel: 0
  };
  if (!list) return [];

  if (!Array.isArray(list)) {
    throw new Error('The first parameter "list" must be an array type.');
  }

  options = options || {};

  if (options.withLevel) {
    return _listToTreeWithLevel(list, options, options.rootPId, options.rootLevel || 0);
  }

  var idField = options.idField || 'id';
  var childrenField = options.childrenField || 'children';
  var parentField = options.parentField || 'pid';
  var _options = options,
      rootPId = _options.rootPId;
  var nodeMap = list.reduce(function (map, node) {
    map[node[idField]] = node;
    node[childrenField] = [];
    return map;
  }, {});
  return list.filter(function (node) {
    nodeMap[node[parentField]] && nodeMap[node[parentField]][childrenField].push(node);
    return node[parentField] === rootPId;
  });
}
/**
 * 扁平数组转为树形数组，并向节点中注入层级信息
 */


function _listToTreeWithLevel(list, options, parentId, level) {
  var idField = options.idField || 'id';
  var childrenField = options.childrenField || 'children';
  var parentField = options.parentField || 'pid';
  var levelField = options.levelField || '_level';
  var tree = list.filter(function (node) {
    return node[parentField] === parentId;
  }).map(function (node) {
    var _objectSpread2$1;

    var children = _listToTreeWithLevel(list, options, node[idField], level + 1);

    return _objectSpread2(_objectSpread2({}, node), {}, (_objectSpread2$1 = {}, _defineProperty(_objectSpread2$1, levelField, level), _defineProperty(_objectSpread2$1, childrenField, children), _objectSpread2$1));
  });
  return tree;
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
function treeToList() {
  var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    childrenField: 'children',
    withLevel: false,
    levelField: '_level',
    rootLevel: 0
  };
  if (!tree) return [];

  if (!Array.isArray(tree)) {
    throw new Error('The first parameter "list" must be an array type.');
  }

  return _processingTree(tree, options);
}

function _processingTree() {
  var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 ? arguments[1] : undefined;
  var result = arguments.length > 2 ? arguments[2] : undefined;
  var level = arguments.length > 3 ? arguments[3] : undefined;
  options = options || {};
  var childrenField = options.childrenField || 'children';
  var levelField = options.levelField || '_level';

  var _result = result || [];

  var _level = level || options.rootLevel || 0;

  tree.forEach(function (node) {
    var newNode = _objectSpread2({}, node);

    delete newNode[childrenField];

    _result.push(newNode);

    if (options.withLevel) {
      node[levelField] = _level;
    }

    node[childrenField] && _processingTree(node[childrenField], options, _result, _level + 1);
  });
  return _result;
}

/**
 * 遍历树形数组
 * @param {Array} tree - 树形数组
 * @param {Function} func - 回调函数，用于判断节点是否需要保留。返回值必须为 boolean 类型，为 true 则表示，该节点需要被保留
 * @param {Object} options - 配置选项
 * @param {String} options.mode - 遍历模式。可选取值为 BF、DF-NLR、DF-LRN，BF:广度优先，DF-NLR:深度优先-先序遍历，DF-LRN:深度优先-后序遍历，默认为 BF
 * @param {String} options.childrenField - 指定节点的孩子为节点对象的某个属性值，默认为 children
 */
function traversalTree(tree, func) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    mode: 'BF',
    childrenField: 'children'
  };
  if (!tree) return;

  if (!Array.isArray(tree)) {
    throw new Error('The first parameter "tree" must be an array type.');
  }

  options = options || {};
  options.mode = ['BF', 'DF-NLR', 'DF-LRN'].includes(options.mode || '') ? options.mode : 'BF';

  if (options.mode === 'BF') {
    return traversalTreeBF(tree, func, options);
  } else {
    return traversalTreeDF(tree, func, options);
  }
}
/**
 * 遍历树形数组 - 广度优先
 */


function traversalTreeBF(tree, func) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    childrenField: 'children'
  };

  var list = _toConsumableArray(tree);

  var node;
  var childrenField = options.childrenField || 'children';

  while (node = list.shift()) {
    func(node);
    node[childrenField] && list.push.apply(list, _toConsumableArray(node[childrenField]));
  }
}
/**
 * 遍历树形数组 - 深度优先
 */


function traversalTreeDF(tree, func) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    mode: 'DF-NLR',
    childrenField: 'children'
  };
  var childrenField = options.childrenField || 'children';

  if (options.mode === 'DF-NLR') {
    // 先序遍历
    tree.forEach(function (node) {
      func(node);
      node[childrenField] && traversalTreeDF(node[childrenField], func);
    });
  } else {
    // 后序遍历
    tree.forEach(function (node) {
      node[childrenField] && traversalTreeDF(node[childrenField], func);
      func(node);
    });
  }
}

/**
 * 查找树节点
 * @param {Array} tree - 树形数组
 * @param {Function} func - 回调函数，用于判断节点是否命中。返回值必须为 boolean 类型，为 true 则表示，该节点命中
 * @param {Object} options - 配置选项
 * @param {String} options.multiple - 是否多选
 * @param {String} options.childrenField - 指定节点的孩子为节点对象的某个属性值，默认为 children
 */
function findTreeNode(tree, func) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    multiple: false,
    childrenField: 'children'
  };
  if (!tree) return [];

  if (!Array.isArray(tree)) {
    throw new Error('The first parameter "tree" must be an array type.');
  }

  options = options || {};

  if (!options.multiple) {
    return findTreeNodeSingle(tree, func, options);
  } else {
    return findTreeNodeMultiple(tree, func, options);
  }
}
/**
 * 查找单个节点
 */


function findTreeNodeSingle(tree, func) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    childrenField: 'children'
  };
  var childrenField = options.childrenField || 'children';

  var _iterator = _createForOfIteratorHelper(tree),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      if (func(node)) return node;

      if (node[childrenField]) {
        var res = findTreeNode(node[childrenField], func, options);
        if (res) return res;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return null;
}
/**
 * 查找多个节点
 */


function findTreeNodeMultiple(tree, func) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    childrenField: 'children'
  };
  var result = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var childrenField = options.childrenField || 'children';

  var _iterator2 = _createForOfIteratorHelper(tree),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var node = _step2.value;
      if (func(node)) result.push(node);

      if (node[childrenField]) {
        var res = findTreeNodeMultiple(node[childrenField], func, options);
        if (res) result.push.apply(result, _toConsumableArray(res));
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return result;
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
function findTreePath(tree, func) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    setPathNodeAsSelf: false,
    multiple: false,
    idField: 'id',
    childrenField: 'children'
  };
  if (!tree) return [];

  if (!Array.isArray(tree)) {
    throw new Error('The first parameter "tree" must be an array type.');
  }

  options = options || {};

  if (!options.multiple) {
    return findTreePathSingle(tree, func, options);
  } else {
    return findTreePathMultiple(tree, func, options);
  }
}
/**
 * 查找单条路径
 */


function findTreePathSingle(tree, func) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    setPathNodeAsSelf: false,
    childrenField: 'children'
  };
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var setPathNodeAsSelf = options.setPathNodeAsSelf;
  var idField = options.idField || 'id';
  var childrenField = options.childrenField || 'children';

  var _iterator = _createForOfIteratorHelper(tree),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;

      if (setPathNodeAsSelf) {
        path.push(node);
      } else {
        path.push(node[idField]);
      }

      if (func(node)) return path;

      if (node[childrenField]) {
        var childrenPath = findTreePathSingle(node[childrenField], func, options, path);
        if (childrenPath.length) return childrenPath;
      }

      path.pop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return [];
}
/**
 * 查找多条路径
 */


function findTreePathMultiple(tree, func) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    setPathNodeAsSelf: false,
    childrenField: 'children'
  };
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var result = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var setPathNodeAsSelf = options.setPathNodeAsSelf;
  var idField = options.idField || 'id';
  var childrenField = options.childrenField || 'children';

  var _iterator2 = _createForOfIteratorHelper(tree),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var node = _step2.value;

      if (setPathNodeAsSelf) {
        path.push(node);
      } else {
        path.push(node[idField]);
      }

      func(node) && result.push(_toConsumableArray(path));
      node[childrenField] && findTreePathMultiple(node[childrenField], func, options, path, result);
      path.pop();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return result;
}

/**
 * 修剪树形数组
 * @param {Array} tree - 树形数组
 * @param {Function} func - 回调函数，用于判断节点是否需要保留。返回值必须为 boolean 类型，为 true 则表示，该节点需要被保留
 * @param {Object} options - 配置选项
 * @param {String} options.childrenField - 指定节点的孩子为节点对象的某个属性值，默认为 children
 */
function trimTree(tree, func) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    childrenField: 'children'
  };
  if (!tree) return [];

  if (!Array.isArray(tree)) {
    throw new Error('The first parameter "tree" must be an array type.');
  }

  options = options || {};
  var childrenField = options.childrenField || 'children';

  if (typeof func !== 'function') {
    throw new Error('The second parameter "func" is required.');
  }

  return tree.filter(function (node) {
    node[childrenField] = node[childrenField] && trimTree(node[childrenField], func);
    return func(node) || node[childrenField] && node[childrenField].length;
  });
}

export { findTreeNode, findTreePath, listToTree, traversalTree, treeToList, trimTree };
