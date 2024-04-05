import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();

  return (
    <h2>{t('404.title')}</h2>
  );
};

export default Page404;
