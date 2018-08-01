import React, { Component } from 'react';
import { Tree, Row, Col } from 'antd';

import Doc from './Doc.js';
import { getFileList, changeFile } from '../utils/index.js';

const TreeNode = Tree.TreeNode;

const treeData = [];

export default class Trees extends React.Component {
  state = {
    treeNode: [],
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
  }

  componentDidMount() {
    const list = getFileList('mock', this.createTree);
    this.setState({
      treeNode: list.fileList,
      checkedKeys: list.checkedList
    });
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys) => {
    let unCheckNew = [];
    let checkNew = [];
    this.state.checkedKeys.forEach(item => {
      if (checkedKeys.indexOf(item) < 0) {
        unCheckNew.push(item);
      }
    });
    checkedKeys.forEach(item => {
      if (this.state.checkedKeys.indexOf(item) < 0) {
        checkNew.push(item);
      }
    })
    changeFile(unCheckNew, checkNew);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  render() {
    const { expandedKeys, autoExpandParent, checkedKeys, selectedKeys, treeNode } = this.state;

    return (
      <Row>
        <Col span={8}>
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={selectedKeys}
          >
            {this.renderTreeNodes(treeNode)}
          </Tree>
        </Col>
        <Col span={16}>
          {selectedKeys.length > 0 && (
            <Doc filePath={selectedKeys[0]} />
          )}
        </Col>
      </Row>
    );
  }
}

