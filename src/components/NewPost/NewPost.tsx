import React, { useState } from 'react';
import { Card, Input, Button, Modal, Upload, Space } from 'antd';
import { CameraOutlined, FileImageOutlined } from '@ant-design/icons';
import { IUser } from '../../types/user.types';
import type { UploadFile } from 'antd/es/upload/interface';

interface NewPostProps {
  currentUser: IUser;
  onSubmit: (content: string, images: UploadFile[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NewPost: React.FC<NewPostProps> = ({ currentUser, onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = () => {
    if (content.trim() || fileList.length > 0) {
      onSubmit(content, fileList);
      setContent('');
      setFileList([]);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Card 
        bodyStyle={{ 
          padding: '12px 24px',
          cursor: 'pointer',
          background: 'var(--component-bg)',
          borderColor: 'var(--border-color)'
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <Space align="center" style={{ width: '100%' }}>
          <Input 
            placeholder="Bạn đang nghĩ gì?"
            style={{ 
              borderRadius: 20,
              width: '460px',
              background: 'var(--search-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-color)'
            }}
            readOnly
          />
          <Button 
            icon={<CameraOutlined />}
            type="text"
            style={{ color: 'var(--text-color)' }}
          >
            Ảnh/Video
          </Button>
        </Space>
      </Card>

      <Modal
        title="Tạo bài viết"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleSubmit}
            disabled={!content.trim() && fileList.length === 0}
          >
            Đăng
          </Button>
        ]}
        style={{ top: 20 }}
      >
        <Input.TextArea
          placeholder="Bạn đang nghĩ gì?"
          autoSize={{ minRows: 3, maxRows: 6 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ 
            marginBottom: 16,
            background: 'var(--search-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-color)'
          }}
        />
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          multiple
          maxCount={9}
          beforeUpload={() => false}
        >
          <div>
            <FileImageOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
          </div>
        </Upload>
      </Modal>
    </>
  );
};

export default NewPost; 