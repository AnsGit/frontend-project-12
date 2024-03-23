import { Field } from 'formik';
import FormFeedback from './FormFeedback';

const FormField = ({
  name, label, type, errors,
}) => (
  <div className="form-group m-auto mb-2">
    <Field
      type={type}
      name={name}
      className="form-control mt-1"
      placeholder={label}
      label={label}
    />
    { errors[name] ? <FormFeedback type="error" code={errors[name]} /> : null }
  </div>
);

export default FormField;
