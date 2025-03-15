/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Layout } from 'antd';
import { IUser } from '../types/user.types';
import Header from '../components/common/Header/Header';
import Sidebar from '../components/common/Sidebar/Sidebar';
import RightSidebar from '../components/RightSidebar/RightSidebar';
// import FollowingList from '../components/FollowingList';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  currentUser?: IUser;
  followingUsers?: IUser[];
}

const mockOnlineUsers = [
  {
    id: '2',
    username: 'janedoe',
    email: 'jane@example.com',
    fullName: 'Jane Doe',
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
    following: [],
    followers: [],
  },
  {
    id: '3',
    username: 'bobsmith',
    email: 'bob@example.com',
    fullName: 'Bob Smith',
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
    following: [],
    followers: [],
  },
  {
    id: '4',
    username: 'alicejohnson',
    email: 'alice@example.com',
    fullName: 'Alice Johnson',
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
    following: [],
    followers: [],
  },
];

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  currentUser
}) => {
  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Header currentUser={currentUser} />

      <Layout 
        style={{ 
          marginTop: 64,
          maxWidth: 1920,
          margin: '64px auto 0',
          background: 'transparent',
          position: 'relative',
          padding: '0 16px'
        }}
      >
        <div style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Left Sidebar */}
          <Layout.Sider
            width={260}
            style={{
              background: 'transparent',
              position: 'sticky',
              top: 88,
              height: 'calc(100vh - 88px)',
              overflowY: 'auto'
            }}
          >
            <Sidebar />
          </Layout.Sider>

          {/* Main Content */}
          <Content 
            style={{
              width: '100%',
              maxWidth: 680,
              minWidth: 680,
              paddingTop: 24
            }}
          >
            {children}
          </Content>

          {/* Right Sidebar */}
          {/* <Layout.Sider
            width={360}
            style={{
              background: 'transparent',
              position: 'sticky',
              top: 88,
              height: 'calc(100vh - 88px)',
              overflowY: 'auto'
            }}
          >
            <RightSidebar 
              currentUser={currentUser || mockOnlineUsers[0]} 
              onlineUsers={mockOnlineUsers} 
            />
          </Layout.Sider> */}
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 