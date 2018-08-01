import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

import Head from './Header.js';
import Setting from './Setting.js';
import Trees from './Tree.js';

export default class App extends Component {
  state = {
    activeTab: "tree"
  }

  _changeTab = (e) => {
    this.setState({
      activeTab: e.key
    });
  }

  render() {
    const { activeTab } = this.state;

    return (
      <Layout className="layout">
        <Head
          handleClick={this._changeTab}
          current={activeTab}
        />
        <Content style={styles.mainContent}>
          {activeTab === 'tree' && <Trees />}
          {activeTab === 'setting' && <Setting />}
        </Content>
      </Layout>
    )
  }
}

const styles = {
  mainContent: {
    marginTop: '64px'
  }
}
