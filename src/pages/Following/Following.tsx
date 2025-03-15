import React from 'react';
import { Typography } from 'antd';
import FollowingList from '../../components/FollowingList';
import { IUser } from '../../types/user.types';

const { Title } = Typography;

// Mock data - trong thực tế sẽ lấy từ API
const mockFollowing: IUser[] = [
  {
    id: '2',
    username: 'janedoe',
    email: 'jane@example.com',
    fullName: 'Jane Doe',
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel',
    following: [],
    followers: [],
  },
  {
    id: '3',
    username: 'bobsmith',
    email: 'bob@example.com',
    fullName: 'Bob Smith',
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel',
    following: [],
    followers: [],
  },
];

const Following: React.FC = () => {
  return (
    <div>
      <Title level={2}>Đang theo dõi</Title>
      <FollowingList users={mockFollowing} />
    </div>
  );
};

export default Following; 