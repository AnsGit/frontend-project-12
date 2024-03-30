import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ChannelForm from '../forms/ChannelForm';
import {
  useAddChannelMutation,
} from '../../services/api/channels.js';
import { chooseChannel } from '../../store/channel';

const ChannelsMenu = () => {
  const [
    addChannel,
    {
      isError: isChannelAddingError,
      isSuccess: isChannelAdded,
      isUninitialized: isChannelAddingUninitialized,
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
    if (isChannelAddingUninitialized) return;

    if (isChannelAddingError) {
      setStatus('error'); return;
    }

    if (isChannelAdded) {
      setStatus('pending');
      setShown(false);
      dispatch(chooseChannel(addedChannelData));
    }
    // eslint-disable-next-line
  }, [
    isChannelAddingUninitialized,
    isChannelAddingError,
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

      <ChannelForm
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
