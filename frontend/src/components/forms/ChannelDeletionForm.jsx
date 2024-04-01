import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormFeedback } from './components/index.js';

const ChannelDeletionForm = (props) => {
  const {
    onSubmit = () => {},
    onCancel = () => {},
    isShown = false,
    status = 'pending',
  } = props;

  const statuses = ['pending', 'sending', 'error', 'success'];

  if (!statuses.includes(status)) {
    throw new Error(`status must have one of the values: ${JSON.stringify(statuses)}`);
  }

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{}}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {() => {
        const toShowFeedback = !['sending', 'pending'].includes(status);
        const feedbackType = status === 'success' ? 'success' : 'error';

        return (
          <Modal show={isShown} onHide={onCancel}>
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>{t('delete-channel')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {t('are-you-sure?')}
                {toShowFeedback && <FormFeedback type={feedbackType} code="channel-delete" />}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                  {t('cancel')}
                </Button>

                <Button variant="danger" type="submit">
                  {t('submit')}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};
export default ChannelDeletionForm;
