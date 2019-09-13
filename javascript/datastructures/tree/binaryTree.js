'use strict'

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    let node = new Node(data);
    if(this.root) {
      let parent = this.findFirstEligibleParent(this.root);
      // console.log('parent -> ' + JSON.stringify(parent));
      if(parent.left) {
        parent.right = node;
      } else {
        parent.left = node;
      }
    } else {
      this.root = node;
    }
    // console.log('After add -> ' + JSON.stringify(this.root));
  }

  delete(data) {
    if (data === this.root.data) {
      const lastLeaf = this.getLastLeaf();
      if(lastLeaf.parent.left.data === lastLeaf.leaf.data) {
        lastLeaf.parent.left = null;
      } else {
        lastLeaf.parent.right = null;
      }
      this.root.data = lastLeaf.leaf.data;
    } else {
      let parent = this.findParent(this.root, data);
      // console.log('parent -> ' + JSON.stringify(parent));
      if(!parent) {
        console.log('The given node could not be found in the tree');
      } else if(parent.left.data === data) {
        parent.left = null;
        // console.log('After delete -> ' + JSON.stringify(this.root));
      } else {
        parent.right = null;
        // console.log('After delete -> ' + JSON.stringify(this.root));
      }
    }
  }

  destroy() {
    this.root = null;
  }

  printTree(traversal, startNode) {
    let values = this.traverseTree(traversal, startNode).map((item) => item.data);
    console.log(traversal + 'Traversal' + ' -> ' + JSON.stringify(values));
  }

  getLastLeaf() {
    const startNode = this.root,
    traversal = 'levelorder',
    leaf = this.traverseTree(traversal, startNode).pop(),
    parent = this.findParent(startNode, leaf.data);
    return { leaf: leaf, parent: parent } ;
  }

  traverseTree(traversal, startNode) {
    if(!startNode) startNode = this.root;
    let values = [];
    this[traversal + 'Traversal'](startNode, (node) => { 
      values.push(node); 
    });
    return values;
  }

  //NLR
  preorderTraversal(node, cb) {
    if(!node) {
      return null;
    } else {
      cb(node);
      this.preorderTraversal(node.left, cb);
      this.preorderTraversal(node.right, cb);
    }
  }

  //LNR
  inorderTraversal(node, cb) {
    if(!node) {
      return null;
    } else {
      this.inorderTraversal(node.left, cb);
      cb(node);
      this.inorderTraversal(node.right, cb);
    }
  }

  //RNL
  outorderTraversal(node, cb) {
    if(!node) {
      return null;
    } else {
      this.outorderTraversal(node.right, cb);
      cb(node);
      this.outorderTraversal(node.left, cb);
    }
  }

  //LRN
  postorderTraversal(node, cb) {
    if(!node) {
      return null;
    } else {
      this.postorderTraversal(node.left, cb);
      this.postorderTraversal(node.right, cb);
      cb(node);
    }
  }

  //BFS
  levelorderTraversal(node, cb) {
    if(!node) {
      return null;
    } else {
      let queue = [node];
      while(queue.length > 0) {
        let childrenQueue = [];
        for(let node of queue) {
          if(node) {          
            cb(node);
            childrenQueue.push(node.left);
            childrenQueue.push(node.right);
          }
        }
        queue = childrenQueue;
      }
    }
  }

  findParent(node, data) {
    let queue = [node];
    // console.log('queue length -> ' + queue.length);
    // console.log(JSON.stringify(queue));
    while(queue.length > 0) {
      let childrenQueue = [];
      for(let node of queue) {
        if(node) {
          // console.log('findParent -> ' + JSON.stringify(node));
          if(node.left.data !== data) {
            childrenQueue.push(node.left);
          } else {
            return node;
          }
          if(node.right.data !== data) {
            childrenQueue.push(node.right);
          } else {
            return node;
          }
        }
      }
      queue = childrenQueue;
    }
  }

  findFirstEligibleParent(node) {
    let queue = [node];
    // console.log('queue length -> ' + queue.length);
    // console.log(JSON.stringify(queue));
    while(queue.length > 0) {
      let childrenQueue = [];
      for(let node of queue) {
        if(node) {
          if(node.left) {
            childrenQueue.push(node.left);
          } else {
            return node;
          }
          if(node.right) {
            childrenQueue.push(node.right);
          } else {
            return node;
          }
        }
      }
      queue = childrenQueue;
    }
  }
}

const demoBinaryTree = () => {
  console.log('Demo Binary Tree');
  let tree = new BinaryTree();
  tree.insert(1);
  tree.insert(2);
  tree.insert(3);
  tree.insert(4);
  tree.insert(5);
  tree.insert(6);
  tree.insert(7);
  tree.printTree('preorder');
  tree.printTree('inorder');
  tree.printTree('outorder');
  tree.printTree('postorder');
  tree.printTree('levelorder');
  tree.delete(7);
  console.log("Deleting => 7")
  tree.delete(1);
  console.log("Deleting => 1")
  tree.printTree('preorder');
  tree.printTree('inorder');
  tree.printTree('outorder');
  tree.printTree('postorder');
  tree.printTree('levelorder');
}

// export { BinaryTree, demoBinaryTree }

demoBinaryTree();