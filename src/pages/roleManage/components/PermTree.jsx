import React from 'react';
import { Tree } from 'antd';
import { connect } from 'dva';

const { TreeNode } = Tree;

const namespace = 'perm';

const mapStateToProps = (state) => {
  const treeData = state[namespace].treeData;
  const treeSelectData = state[namespace].treeSelectData;
  return {
    treeData,
    treeSelectData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryTreeData`,
      });
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PermTree extends React.Component {
  componentDidMount() {
    this.props.onDidMount();
  }

  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: this.props.initSelect,
    selectedKeys: [],
  };

  onExpand = expandedKeys => {
    //console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    //console.log('onCheck', checkedKeys);
    const { onChecked } = this.props;
    onChecked({checkedKeys});
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    //console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  render() {
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(this.props.treeData)}
      </Tree>
    );
  }
}


