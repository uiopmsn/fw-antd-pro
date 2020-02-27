import React from 'react';
import { Tree } from 'antd';
import { connect } from 'dva';

const { TreeNode } = Tree;

const namespace = 'perm';

const mapStateToProps = (state) => {
  const treeData = state[namespace].allPerm;
  const treeCheckedData = state[namespace].rolePerm;
  return {
    treeData,
    treeCheckedData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryAllPerm`,
      });
    },
    initChecked: (roleId) => {
      dispatch({
        type: namespace+'/queryRolePerm',
        payload: roleId,
      })
    },
    changeChecked: (checkedKeys) => {
      dispatch({
        type: namespace+'/saveRolePerm',
        payload: checkedKeys,
      })
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PermTree extends React.Component {

  constructor(props){
    super(props);
    props.initChecked(props.roleId);
  }

  componentDidMount() {
    this.props.onDidMount();
  }

  state = {
    expandedKeys: [],
    autoExpandParent: true,
    //checkedKeys: [],
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
    this.props.onChecked(checkedKeys);
    console.log("checkedKeys: " , checkedKeys);
    this.props.changeChecked(checkedKeys);
    //this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
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
        checkedKeys={this.props.treeCheckedData}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(this.props.treeData)}
      </Tree>
    );
  }
}


