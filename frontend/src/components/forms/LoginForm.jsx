import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

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

const renderFeedback = ({ type, code }) => {
  const feedbackType = type === 'error' ? 'invalid' : 'valid';

  return (
    <div className={`d-block text-start ${feedbackType}-feedback`}>{code}</div>
  );
};

const renderField = (name, label, type, errors) => (
  <div className="form-group m-auto mb-2">
    <Field
      type={type}
      name={name}
      className="form-control mt-1"
      placeholder={label}
      label={label}
    />
    { errors[name] ? renderFeedback({ type: 'error', code: errors[name] }) : null }
  </div>
);

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
          {status && renderFeedback(status)}

          {renderField('username', 'Username', 'text', errors)}
          {renderField('password', 'Password', 'password', errors)}

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
