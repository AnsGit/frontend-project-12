import { useTranslation } from 'react-i18next';

const ChatPage = () => {
  const { t } = useTranslation();

  return (
    <h2>{t('chat.title')}</h2>
  );
};

export default ChatPage;
