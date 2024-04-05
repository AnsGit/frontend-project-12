import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { ChannelEditionForm } from '../forms';
import {
  useAddChannelMutation,
} from '../../services/api/channels.js';
import { chooseChannel } from '../../store/channel';
import { ToastContext } from '../toastify.jsx';

const ChannelsMenu = () => {
  const { t } = useTranslation();
  const { notify } = useContext(ToastContext);

  const [
    addChannel,
    {
      isError: isChannelAdditionError,
      isSuccess: isChannelAdded,
      isUninitialized: isChannelAdditionUninitialized,
      data: addedChannelData,
    },
  ] = useAddChannelMutation();

  const dispatch = useDispatch();

  const [isShown, setShown] = useState(false);
  const [status, setStatus] = useState('pending');

  const hide = () => setShown(false);
  const show = () => setShown(true);

  const onSubmit = (data, { resetForm }) => {
    setStatus('sending');

    addChannel(data).then(resetForm);
  };

  useEffect(() => {
    if (isChannelAdditionUninitialized) return;

    if (isChannelAdditionError) {
      setStatus('error');
      notify('error', t('toastify.error-channel-creation'));
      return;
    }

    if (isChannelAdded) {
      setStatus('pending');
      setShown(false);
      dispatch(chooseChannel(addedChannelData));
      notify('success', t('toastify.success-channel-creation'));
    }
    // eslint-disable-next-line
  }, [
    isChannelAdditionUninitialized,
    isChannelAdditionError,
    isChannelAdded,
  ]);

  return (
    <>
      <Button
        variant="primary"
        className="btn btn-primary col col-auto fs-5 p-0 px-2 w-auto"
        onClick={show}
      >
        +
      </Button>

      <ChannelEditionForm
        onSubmit={onSubmit}
        onCancel={hide}
        isShown={isShown}
        status={status}
        type="add"
      />
    </>
  );
};

export default ChannelsMenu;
