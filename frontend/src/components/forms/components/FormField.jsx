import { Field } from 'formik';
import FormFeedback from './FormFeedback';

const FormField = ({
  name, label, type, errors, component = 'input',
}) => (
  <div className="form-group m-auto mb-2">
    <label className="visually-hidden" htmlFor={`${name}-field`}>{label}</label>

    <Field
      type={type}
      id={`${name}-field`}
      name={name}
      component={component}
      className="form-control mt-1"
      placeholder={label}
      label={label}
      aria-label={label}
      style={{ resize: 'none' }}
    />
    { errors[name] ? <FormFeedback type="error" code={errors[name]} /> : null }
  </div>
);

export default FormField;
