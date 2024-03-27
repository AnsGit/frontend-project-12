import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chat from '../chat';

const ChatPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.token) return;

    navigate('/login');
    // eslint-disable-next-line
  }, [user]);

  if (!user.token) return null;

  return (
    <div className="w-auto text-center">
      <Chat />
    </div>
  );
};

export default ChatPage;
