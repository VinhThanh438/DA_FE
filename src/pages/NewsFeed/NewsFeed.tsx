import React, { useState } from 'react';
import { Layout } from 'antd';
import NewPost from '../../components/NewPost/NewPost';
import PostCard from '../../components/PostCard/PostCard';
import type { UploadFile } from 'antd/es/upload/interface';
import { IUser } from '../../types/user.types';

// Mock data
const mockUser: IUser = {
  id: '1',
  username: 'johndoe',
  email: 'john@example.com',
  fullName: 'John Doe',
  avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel',
  following: [],
  followers: [],
};

const mockPosts = [
  {
    id: '1',
    user: mockUser,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3',
    ],
    likes: 15,
    isLiked: false,
    comments: [
      {
        id: '1',
        user: {
          ...mockUser,
          id: '2',
          username: 'janedoe',
          fullName: 'Jane Doe',
        },
        content: 'Tuyệt vời!',
        createdAt: '2 giờ trước',
      },
      {
        id: '2',
        user: {
          ...mockUser,
          id: '3',
          username: 'bobsmith',
          fullName: 'Bob Smith',
        },
        content: 'Rất hay!',
        createdAt: '1 giờ trước',
      },
    ],
    createdAt: '3 giờ trước',
  },
  {
    id: '2',
    user: {
      ...mockUser,
      id: '2',
      username: 'janedoe',
      fullName: 'Jane Doe',
    },
    content: 'Bài viết ngắn hơn',
    images: [
      'https://picsum.photos/800/600?random=4',
    ],
    likes: 10,
    isLiked: true,
    comments: [],
    createdAt: '5 giờ trước',
  },
];

const NewsFeed: React.FC = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleNewPost = (content: string, images: UploadFile[]) => {
    const newPost = {
      id: String(posts.length + 1),
      user: mockUser,
      content,
      images: images.map(file => URL.createObjectURL(file.originFileObj as Blob)),
      likes: 0,
      isLiked: false,
      comments: [],
      createdAt: 'Vừa xong',
    };
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: String(post.comments.length + 1),
              user: mockUser,
              content,
              createdAt: 'Vừa xong',
            },
          ],
        };
      }
      return post;
    }));
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
  };

  const handleReport = (postId: string) => {
    console.log('Report post:', postId);
  };

  const handleSave = (postId: string) => {
    console.log('Save post:', postId);
  };

  return (
    <Layout.Content style={{ padding: '24px', maxWidth: 680, margin: '0 auto' }}>
      <NewPost currentUser={mockUser} onSubmit={handleNewPost} />
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onReport={handleReport}
          onSave={handleSave}
        />
      ))}
    </Layout.Content>
  );
};

export default NewsFeed; 