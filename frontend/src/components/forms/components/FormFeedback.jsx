import { useTranslation } from 'react-i18next';

const FormFeedback = ({ type, code }) => {
  if (!['error', 'success'].includes(type)) {
    throw new Error('Incorrect value of type (use "error" or "success")');
  }

  const feedbackType = type === 'error' ? 'invalid' : 'valid';

  const { t } = useTranslation();

  return (
    <div
      className={`d-block text-start ${feedbackType}-feedback`}
    >
      {t(`feedback.${type}-${code}`)}
    </div>
  );
};

export default FormFeedback;
