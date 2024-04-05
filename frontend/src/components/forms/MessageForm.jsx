import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { FormField } from './components';

const validationSchema = Yup.object({
  body: Yup.string()
    .required('field-required'),
});

const MessageForm = (props) => {
  const { onSubmit = () => {}, status = 'pending' } = props;

  const statuses = ['pending', 'sending', 'error', 'success'];

  if (!statuses.includes(status)) {
    throw new Error(`status must have one of the values: ${JSON.stringify(statuses)}`);
  }

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
        const isDisabled = status === 'sending' || isEmpty;

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
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isDisabled}
                >
                  {t('send')}
                </Button>
              </div>
            </div>

          </Form>
        );
      }}
    </Formik>
  );
};
export default MessageForm;
