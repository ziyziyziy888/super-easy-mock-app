import React, { Component } from 'react';

import Header from './Header.js';
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
      <div>
        <Header
          handleClick={this._changeTab}
          current={activeTab}
        />
        {activeTab === 'tree' && <Trees />}
        {activeTab === 'setting' && <Setting />}
      </div>
    )
  }
}
