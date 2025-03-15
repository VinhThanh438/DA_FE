import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import NewsFeed from './pages/NewsFeed/NewsFeed';
import Following from './pages/Following/Following';
import Settings from './pages/Settings/Settings';
import { ThemeProvider } from './contexts/ThemeContext';
import { IUser } from './types/user.types';

// Mock data for testing
const mockUser: IUser = {
  id: '1',
  username: 'johndoe',
  email: 'john@example.com',
  fullName: 'John Doe',
  avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel',
  following: [],
  followers: [],
};

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

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout currentUser={mockUser} followingUsers={mockFollowing}>
          <Routes>
            <Route path="/" element={<NewsFeed />} />
            <Route path="/following" element={<Following />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
