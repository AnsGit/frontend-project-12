import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { FormFeedback, FormField } from './components';

const validationSchema = Yup.object({
  username: Yup.string()
    .max(15, 'username-long')
    .min(5, 'username-short')
    .required('field-required'),
  password: Yup.string()
    .max(15, 'password-long')
    .min(5, 'password-short')
    .required('field-required'),
});

const LoginForm = (props) => {
  const { onLogin = () => {} } = props;

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async (values, { setStatus }) => {
        try {
          const response = await axios.post('/api/v1/login', values);

          setStatus({ type: 'success', code: 'login' });
          onLogin(response.data);
        } catch (e) {
          setStatus({ type: 'error', code: 'login' });
        }
      }}
    >
      {({ values, errors, status }) => {
        const isEmpty = Object.values(values).some((v) => v === '');

        return (
          <Form className="m-auto w-25">
            {status && <FormFeedback type={status.type} code={status.code} />}

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

            <button
              type="submit"
              className="btn btn-primary mt-1"
              disabled={isEmpty}
            >
              {t('submit')}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
export default LoginForm;
