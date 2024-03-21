import { Formik, Form, Field } from 'formik';

const LoginForm = () => (
  <Formik
    initialValues={{ login: '', password: '' }}
    onSubmit={({ setSubmitting }) => {
      console.log('Form was sent');
      setSubmitting(false);
    }}
  >
    <Form>
      <div className="form-group">
        <Field
          type="text"
          name="login"
          className="form-control"
          label="Login"
        />
      </div>

      <div className="form-group">
        <Field
          type="password"
          name="password"
          className="form-control"
          label="Password"
        />
      </div>

      <button type="submit">Submit</button>
    </Form>
  </Formik>
);

export default LoginForm;
