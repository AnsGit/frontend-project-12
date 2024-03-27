import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { FormField } from './components';

const validationSchema = Yup.object({
  body: Yup.string()
    .required('field-required'),
});

const MessageForm = (props) => {
  const { onSubmit = () => {} } = props;

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ body: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ values, errors }) => {
        const isEmpty = Object.values(values).some((v) => v === '');

        return (
          <Form className="w-100">
            <div className="row align-items-center">
              <div className="col p-3">
                <FormField
                  name="body"
                  component="textarea"
                  label={t('message')}
                  type="text"
                  errors={errors}
                />
              </div>
              <div className="col col-1 w-25 col p-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isEmpty}
                >
                  {t('send')}
                </button>
              </div>
            </div>

          </Form>
        );
      }}
    </Formik>
  );
};
export default MessageForm;
