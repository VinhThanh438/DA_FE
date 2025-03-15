import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sideMenuItems: MenuProps['items'] = [
    {
      key: 'newsfeed',
      label: 'Bảng tin',
      icon: <HomeOutlined />,
      onClick: () => navigate('/'),
    },
    {
      key: 'following',
      label: 'Theo dõi',
      icon: <TeamOutlined />,
      onClick: () => navigate('/following'),
    },
    {
      key: 'settings',
      label: 'Cài đặt',
      icon: <SettingOutlined />,
      onClick: () => navigate('/settings'),
    },
  ];

  return (
    <Sider 
      width={300} 
      theme="light"
      collapsed={collapsed}
      style={{
        position: 'fixed',
        left: 0,
        height: 'calc(100vh - 64px)',
        borderRight: '1px solid #f0f0f0',
        background: '#fff'
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname === '/' ? 'newsfeed' : location.pathname.slice(1)]}
        style={{ 
          height: '100%', 
          borderRight: 0,
          paddingTop: 16
        }}
        items={sideMenuItems}
      />
    </Sider>
  );
};

export default Sidebar; 