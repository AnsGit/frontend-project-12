import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormFeedback, FormField } from './components/index.js';
import { useGetChannelsQuery } from '../../services/api/channels.js';

const ChannelEditionForm = (props) => {
  const {
    onSubmit = () => {},
    onCancel = () => {},
    name = '',
    isShown = false,
    type = 'add',
    status = 'pending',
  } = props;

  const types = ['add', 'update'];

  if (!types.includes(type)) {
    throw new Error(`type must have one of the values: ${JSON.stringify(types)}`);
  }

  const statuses = ['pending', 'sending', 'error', 'success'];

  if (!statuses.includes(status)) {
    throw new Error(`status must have one of the values: ${JSON.stringify(statuses)}`);
  }

  const { data: channels, isSuccess: isChannelsDataLoaded } = useGetChannelsQuery();

  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(20, 'channel-name-long')
      .min(3, 'channel-name-short')
      .test(
        'check-channel-existing',
        'channel-exists',
        (value) => channels.every((channel) => channel.name !== value),
      )
      .required('field-required'),
  });

  if (!isChannelsDataLoaded) return null;

  return (
    <Formik
      enableReinitialize
      initialValues={{ name }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ values, errors, initialValues }) => {
        const isEmpty = Object.entries(values).some(
          ([key, value]) => value === initialValues[key],
        );

        const isDisabled = status === 'sending' || isEmpty;

        const toShowFeedback = !['sending', 'pending'].includes(status);
        const feedbackType = status === 'success' ? 'success' : 'error';

        return (
          <Modal show={isShown} onHide={onCancel}>
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>{t(`${type}-channel`)}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {toShowFeedback && <FormFeedback type={feedbackType} code="channel-save" />}

                <FormField
                  name="name"
                  label={t('channel-name')}
                  type="text"
                  errors={errors}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                  {t('cancel')}
                </Button>

                <Button variant="primary" type="submit" disabled={isDisabled}>
                  {t('send')}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};
export default ChannelEditionForm;
