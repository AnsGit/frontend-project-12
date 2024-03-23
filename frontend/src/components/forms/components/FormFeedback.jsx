const FormFeedback = ({ type, code }) => {
  const feedbackType = type === 'error' ? 'invalid' : 'valid';

  return (
    <div className={`d-block text-start ${feedbackType}-feedback`}>{code}</div>
  );
};

export default FormFeedback;
