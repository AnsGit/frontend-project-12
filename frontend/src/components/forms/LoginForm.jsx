import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FormFeedback, FormField } from './components';

const validationSchema = Yup.object({
  username: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .min(5, 'Must be at least 5 characters')
    .required('Required'),
  password: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .min(5, 'Must be at least 5 characters')
    .required('Required'),
});

const LoginForm = () => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validationSchema={validationSchema}
    validateOnBlur={false}
    validateOnChange={false}
    onSubmit={async (values, { setStatus }) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        const { data } = response;
        setStatus({ type: 'success', code: 'Success' });
        console.log(data);
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
            label="Username"
            type="text"
            errors={errors}
          />

          <FormField
            name="password"
            label="Password"
            type="password"
            errors={errors}
          />

          <button
            type="submit"
            className="btn btn-primary mt-1"
            disabled={isEmpty}
          >
            Submit
          </button>
        </Form>
      );
    }}
  </Formik>
);
export default LoginForm;
