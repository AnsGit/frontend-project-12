import { useFormik } from 'formik';

const renderField = (name, label, type, formik) => {
  const id = `${name}-form-login`;

  return (
    <div className="form-group mb-2">
      <label htmlFor={id} className="text-start">
        {label}
        <input
          id={id}
          type={type}
          name={name}
          className="form-control mt-1"
          placeholder={label}
          onChange={formik.handleChange}
          value={formik.values[name]}
        />
      </label>

    </div>
  );
};

const LoginForm = () => {
  const formik = useFormik({
    initialValues: { login: '', password: '' },
    onSubmit: (values) => {
      console.log(values);
      console.log('Form was sent');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {renderField('login', 'Login', 'text', formik)}
      {renderField('password', 'Password', 'password', formik)}
      <button type="submit" className="btn btn-primary mt-1">Submit</button>
    </form>
  );
};

export default LoginForm;
