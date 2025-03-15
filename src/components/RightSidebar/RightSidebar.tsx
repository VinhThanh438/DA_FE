/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Layout, Typography, Card, Avatar, Button } from 'antd';
import { GiftFilled } from '@ant-design/icons';
import { IUser } from '../../types/user.types';

const { Text } = Typography;

interface RightSidebarProps {
  currentUser: IUser;
  onlineUsers: IUser[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ currentUser, onlineUsers }) => {
  const birthdays = [
    {
      user: {
        fullName: 'Jane Doe',
      },
      date: 'Hôm nay'
    }
  ];

  return (
    <Layout.Sider
      width={360}
      style={{
        background: 'transparent',
        position: 'fixed',
        top: 88,
        right: 0,
        height: 'calc(100vh - 88px)',
        padding: '0 8px',
        overflowY: 'auto'
      }}
    >
      {/* Sinh nhật */}
      {birthdays.length > 0 && (
        <Card
          style={{
            marginBottom: 16,
            background: 'var(--component-bg)',
            borderRadius: 8,
          }}
          bodyStyle={{ padding: '12px 16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ 
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#E7F3FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GiftFilled style={{ fontSize: 20, color: '#1877F2' }} />
            </div>
            <div>
              <Text strong style={{ fontSize: 15, color: 'var(--text-color)' }}>
                Sinh nhật
              </Text>
              <div style={{ fontSize: 13, color: 'var(--text-color)' }}>
                Hôm nay là sinh nhật của <Text strong>Jane Doe</Text>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Người liên hệ */}
      <Card
        style={{
          background: 'var(--component-bg)',
          borderRadius: 8
        }}
        bodyStyle={{ padding: '12px 16px' }}
      >
        <Text strong style={{ fontSize: 17, color: 'var(--text-color)' }}>
          Người theo dõi
        </Text>

        <div style={{ marginTop: 12 }}>
          {onlineUsers.map(user => (
            <Button
              key={user.id}
              type="text"
              style={{
                width: '100%',
                textAlign: 'left',
                height: 'auto',
                padding: '8px',
                marginBottom: 4
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ position: 'relative' }}>
                  <Avatar src={user.avatar} size={36} />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#31A24C',
                      border: '2px solid var(--component-bg)'
                    }}
                  />
                </div>
                <Text style={{ color: 'var(--text-color)' }}>{user.fullName}</Text>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </Layout.Sider>
  );
};

export default RightSidebar; 