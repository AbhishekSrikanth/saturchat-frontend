import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatLayout from './layouts/ChatLayout';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import NoConversationSelected from './components/NoConversationSelected';
import ErrorPage from './pages/ErrorPage';
import './App.css';

function App() {
  return (
    <div className='h-screen w-screen'>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* Private */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ChatLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<NoConversationSelected />} />
            <Route path="chat/:conversationId" element={<ChatPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Catch-all unknown routes */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
