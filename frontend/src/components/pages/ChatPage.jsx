import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const { t } = useTranslation();

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.token) return;

    navigate('/login');
  // eslint-disable-next-line
  }, [user]);

  return (
    <h2>{t('chat.title')}</h2>
  );
};

export default ChatPage;
