import React from 'react';
import { Layout, Input, Badge, Avatar, Dropdown, Switch } from 'antd';
import {
  MessageOutlined,
  BellOutlined,
  UserOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { IUser } from '../../../types/user.types';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';

const { Header: AntHeader } = Layout;
const { Search } = Input;

interface HeaderProps {
  currentUser?: IUser;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Thông tin cá nhân',
      icon: <UserOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <UserOutlined />,
      onClick: () => {
        // Xử lý logout
        navigate('/login');
      },
    },
  ];

  return (
    <AntHeader 
      style={{ 
        padding: '0 24px', 
        background: 'var(--header-bg)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="logo" style={{ width: 120, color: 'var(--text-color)' }}>
        <img 
          src="https://i.pinimg.com/736x/0e/cb/45/0ecb454263d0f4e26534cf974512eea5.jpg" 
          alt="Logo" 
          style={{ height: 32, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
      </div>
      
      <Search
        placeholder="Tìm kiếm..."
        style={{ width: 400 }}
        className="search-input"
      />
      
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Switch
              checkedChildren={<BulbFilled />}
              unCheckedChildren={<BulbOutlined />}
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
        <Badge count={5} size="small">
          <MessageOutlined 
            style={{ fontSize: 20, cursor: 'pointer' }} 
            onClick={() => navigate('/messages')}
          />
        </Badge>
        <Dropdown
          menu={{
            items: [
              { key: '1', label: 'Thông báo 1' },
              { key: '2', label: 'Thông báo 2' },
            ]
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Badge count={2} size="small">
            <BellOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          </Badge>
        </Dropdown>
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
          <Avatar src={currentUser?.avatar} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header; 