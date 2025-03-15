import React from 'react';
import { List, Avatar } from 'antd';
import { IUser } from '../types/user.types';

interface FollowingListProps {
  users: IUser[];
  loading?: boolean;
}

const FollowingList: React.FC<FollowingListProps> = ({ users, loading = false }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={users}
      loading={loading}
      renderItem={(user) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={user.avatar} />}
            title={user.fullName}
            description={`@${user.username}`}
          />
        </List.Item>
      )}
    />
  );
};

export default FollowingList; 