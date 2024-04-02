import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { FormFeedback, FormField } from './components';

const isPasswordConfirmed = (values) => values.password === values.passwordConfirmation;

const validationSchema = Yup.object({
  username: Yup.string()
    .max(20, 'signup-username-long')
    .min(3, 'signup-username-short')
    .required('field-required'),
  password: Yup.string()
    .max(20, 'signup-password-long')
    .min(6, 'signup-password-short')
    .test(
      'check-password',
      'signup-password-confirmation',
      (value, data) => isPasswordConfirmed(data.parent),
    )
    .required('field-required'),
  passwordConfirmation: Yup.string()
    .max(20, 'signup-password-long')
    .min(6, 'signup-password-short')
    .test(
      'check-password',
      'signup-password-confirmation',
      (value, data) => isPasswordConfirmed(data.parent),
    )
    .required('field-required'),
});

const SignUpForm = (props) => {
  const navigate = useNavigate();

  const { onSubmit = () => {}, status = 'pending' } = props;

  const statuses = ['pending', 'sending', 'error', 'success'];

  if (!statuses.includes(status)) {
    throw new Error(`status must have one of the values: ${JSON.stringify(statuses)}`);
  }

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ values, errors }) => {
        const isEmpty = Object.values(values).some((v) => v === '');
        const isDisabled = status === 'sending' || isEmpty;

        const toShowFeedback = !['pending', 'sending'].includes(status);
        const feedbackType = status === 'success' ? 'success' : 'error';

        return (
          <Form className="m-auto w-25">
            {toShowFeedback && <FormFeedback type={feedbackType} code="signup" />}

            <FormField
              name="username"
              label={t('username')}
              type="text"
              errors={errors}
            />

            <FormField
              name="password"
              label={t('password')}
              type="password"
              errors={errors}
            />

            <FormField
              name="passwordConfirmation"
              label={t('password-confirmation')}
              type="password"
              errors={errors}
            />

            <Button
              type="submit"
              className="btn btn-primary mt-1"
              disabled={isDisabled}
            >
              {t('submit')}
            </Button>

            <span className="d-flex justify-content-center mt-4 w-100">
              <a
                href="/login"
                className="ms-lg-1"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(e.target.pathname);
                }}
              >
                {t('login.title')}
              </a>
            </span>
          </Form>
        );
      }}
    </Formik>
  );
};
export default SignUpForm;
