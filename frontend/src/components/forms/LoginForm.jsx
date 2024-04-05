import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { FormFeedback, FormField } from './components';

const validationSchema = Yup.object({
  username: Yup.string()
    .max(15, 'login-username-long')
    .min(3, 'login-username-short')
    .required('field-required'),
  password: Yup.string()
    .max(15, 'login-password-long')
    .min(5, 'login-password-short')
    .required('field-required'),
});

const LoginForm = (props) => {
  const navigate = useNavigate();

  const { onSubmit = () => {}, status = 'pending' } = props;

  const statuses = ['pending', 'sending', 'error', 'success'];

  if (!statuses.includes(status)) {
    throw new Error(`status must have one of the values: ${JSON.stringify(statuses)}`);
  }

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ values, errors }) => {
        const isEmpty = Object.values(values).some((v) => v === '');
        const isDisabled = status === 'sending' || isEmpty;

        const toShowFeedback = status !== 'pending';
        const feedbackType = status === 'success' ? 'success' : 'error';

        return (
          <Form className="m-auto w-25">
            {toShowFeedback && <FormFeedback type={feedbackType} code="login" />}

            <FormField
              name="username"
              label={t('usernickname')}
              type="text"
              errors={errors}
            />

            <FormField
              name="password"
              label={t('password')}
              type="password"
              errors={errors}
            />

            <Button
              type="submit"
              className="btn btn-primary mt-1"
              disabled={isDisabled}
            >
              {t('enter')}
            </Button>

            <span className="d-flex justify-content-center mt-4 w-100">
              {t('login.no-account?')}
              <a
                href="/signup"
                className="ms-lg-1"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(e.target.pathname);
                }}
              >
                {t('signup.title')}
              </a>
            </span>
          </Form>
        );
      }}
    </Formik>
  );
};
export default LoginForm;
