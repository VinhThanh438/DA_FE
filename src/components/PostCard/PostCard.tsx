import React, { useState } from 'react';
import { Card, Avatar, Typography, Space, Button, Dropdown, Image, Input } from 'antd';
import { 
  HeartOutlined, 
  HeartFilled, 
  CommentOutlined, 
  ShareAltOutlined,
  EllipsisOutlined,
  SendOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { IUser } from '../../types/user.types';

const { Text, Paragraph } = Typography;

interface Comment {
  id: string;
  user: IUser;
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  user: IUser;
  content: string;
  images: string[];
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onShare: (postId: string) => void;
  onReport: (postId: string) => void;
  onSave: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onLike, 
  onComment, 
  onShare,
  onReport,
  onSave
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [visibleComments, setVisibleComments] = useState(3);

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'report',
      label: 'Báo cáo',
      onClick: () => onReport(post.id)
    },
    {
      key: 'save',
      label: 'Lưu tin',
      onClick: () => onSave(post.id)
    }
  ];

  const handleSubmitComment = () => {
    if (commentInput.trim()) {
      onComment(post.id, commentInput);
      setCommentInput('');
    }
  };

  const loadMoreComments = () => {
    setVisibleComments(prev => prev + 10);
  };

  return (
    <Card
      style={{ 
        marginBottom: 16,
        background: 'var(--component-bg)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Space>
          <Avatar src={post.user.avatar} />
          <div>
            <Text strong style={{ color: 'var(--text-color)' }}>{post.user.fullName}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{post.createdAt}</Text>
          </div>
        </Space>
        <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      </div>

      <Paragraph
        ellipsis={showFullContent ? false : { rows: 3 }}
        style={{ color: 'var(--text-color)', marginBottom: 16 }}
      >
        {post.content}
      </Paragraph>
      
      {!showFullContent && post.content.length > 150 && (
        <Button 
          type="link" 
          onClick={() => setShowFullContent(true)}
          style={{ padding: 0, marginBottom: 16 }}
        >
          Xem thêm
        </Button>
      )}

      {post.images.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <Image.PreviewGroup>
            <div style={{ 
              display: 'grid', 
              gap: 8,
              gridTemplateColumns: post.images.length === 1 ? '1fr' : 
                                 post.images.length === 2 ? '1fr 1fr' :
                                 'repeat(3, 1fr)',
              gridAutoRows: '200px'
            }}>
              {post.images.slice(0, 9).map((image, index) => (
                <div key={index} style={{ 
                  position: 'relative',
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={image}
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {index === 8 && post.images.length > 9 && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: 24
                    }}>
                      +{post.images.length - 9}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Image.PreviewGroup>
        </div>
      )}

      <Space style={{ marginBottom: 16 }}>
        <Button
          type="text"
          icon={post.isLiked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
          onClick={() => onLike(post.id)}
        >
          {post.likes}
        </Button>
        <Button
          type="text"
          icon={<CommentOutlined />}
          onClick={() => setShowComments(!showComments)}
        >
          {post.comments.length}
        </Button>
        <Button
          type="text"
          icon={<ShareAltOutlined />}
          onClick={() => onShare(post.id)}
        >
          Chia sẻ
        </Button>
      </Space>

      {showComments && (
        <div>
          <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
            <Input
              placeholder="Viết bình luận..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onPressEnter={handleSubmitComment}
              style={{
                background: 'var(--search-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-color)'
              }}
            />
            <Button 
              icon={<SendOutlined />} 
              onClick={handleSubmitComment}
              disabled={!commentInput.trim()}
            />
          </Space.Compact>

          {post.comments.slice(0, visibleComments).map((comment) => (
            <div key={comment.id} style={{ marginBottom: 12 }}>
              <Space align="start">
                <Avatar src={comment.user.avatar} size="small" />
                <div style={{ 
                  background: 'var(--search-bg)',
                  padding: '8px 12px',
                  borderRadius: 16
                }}>
                  <Text strong style={{ color: 'var(--text-color)', fontSize: 13 }}>
                    {comment.user.fullName}
                  </Text>
                  <br />
                  <Text style={{ color: 'var(--text-color)', fontSize: 13 }}>
                    {comment.content}
                  </Text>
                </div>
              </Space>
            </div>
          ))}

          {post.comments.length > visibleComments && (
            <Button 
              type="link" 
              onClick={loadMoreComments}
              style={{ padding: 0 }}
            >
              Xem thêm bình luận
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default PostCard; 