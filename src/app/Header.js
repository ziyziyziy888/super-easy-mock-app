import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Head = ({ handleClick, current }) => (
  <Header style={styles.topHeader}>
    <div style={styles.logo}>
      美菜 Super Easy Mock 工具
    </div>
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
      style={styles.navMenu}
    >
      <Menu.Item key="tree">
        <Icon type="appstore" />Api
      </Menu.Item>
      <Menu.Item key="setting">
        <Icon type="setting" />配置
      </Menu.Item>
    </Menu>
  </Header>
);

const styles = {
  topHeader: {
    position: 'fixed',
    zIndex: 1,
    width: '100%'
  },
  logo: {
    height: '30px',
    fontSize: '16px',
    lineHeight: '30px',
    color: 'rgba(255,255,255,.2)',
    margin: '16px 24px 16px 0',
    float: 'left',
  },
  navMenu: {
    lineHeight: '64px'
  }
}

export default Head;
