import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Header = ({ handleClick, current }) => (
  <Menu
    onClick={handleClick}
    selectedKeys={[current]}
    mode="horizontal"
  >
    <Menu.Item disabled>
      美菜 Super Easy Mock 工具
    </Menu.Item>
    <Menu.Item key="tree">
      <Icon type="appstore" />Api
    </Menu.Item>
    <Menu.Item key="setting">
      <Icon type="setting" />配置
    </Menu.Item>
  </Menu>
);

export default Header;
