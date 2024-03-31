import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ChannelForm from '../forms/ChannelForm.jsx';
import {
  useUpdateChannelMutation,
  // useDeleteChannelMutation,
} from '../../services/api/channels.js';

const ChannelMenu = (props = {}) => {
  const { id, name } = props;

  const { t } = useTranslation();

  const [
    updateChannel,
    {
      isError: isChannelUpdatingError,
      isSuccess: isChannelUpdated,
      isUninitialized: isChannelUpdatingUninitialized,
      // data: updatedChannelData,
    },
  ] = useUpdateChannelMutation();

  // const [
  //   deleteChannel,
  //   {
  //     isError: isChannelDeletingError,
  //     isSuccess: isChannelDeleted,
  //     isUninitialized: isChannelDeletingUninitialized,
  //     data: deletedChannelData,
  //   },
  // ] = useDeleteChannelMutation();

  const [action, setAction] = useState(null);
  const [isShown, setShown] = useState(false);
  const [status, setStatus] = useState('pending');

  const hide = () => setShown(false);
  const show = () => setShown(true);

  const onItemClick = ((e) => {
    setAction(e.target.dataset.action);
    show();
  });

  const onUpdate = (data) => {
    setStatus('sending');

    updateChannel({ ...data, id });
  };

  // const onDelete = (data, { resetForm }) => {
  //   setStatus('sending');

  //   deleteChannel(id).then(resetForm);
  // };

  useEffect(() => {
    if (isChannelUpdatingUninitialized) return;

    if (isChannelUpdatingError) {
      setStatus('error'); return;
    }

    if (isChannelUpdated) {
      setStatus('pending');
      setShown(false);
    }
    // eslint-disable-next-line
  }, [
    isChannelUpdatingUninitialized,
    isChannelUpdatingError,
    isChannelUpdated,
  ]);

  // useEffect(() => {
  //   if (isChannelDeletingUninitialized) return;

  //   if (isChannelDeletingError) {
  //     setStatus('error'); return;
  //   }

  //   if (isChannelDeleted) {
  //     setStatus('pending');
  //     setShown(false);
  //   }
  //   // eslint-disable-next-line
  // }, [
  //   isChannelDeletingUninitialized,
  //   isChannelDeletingError,
  //   isChannelDeleted,
  // ]);

  return (
    <>
      <Dropdown
        as={ButtonGroup}
      >
        <Dropdown.Toggle split className="rounded-start-0 rounded-end-2" />

        <Dropdown.Menu className="super-colors">
          <Dropdown.Item
            data-action="delete"
            href="#"
            onClick={onItemClick}
          >
            {t('delete')}
          </Dropdown.Item>

          <Dropdown.Item
            data-action="rename"
            href="#"
            onClick={onItemClick}
          >
            {t('rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <ChannelForm
        onSubmit={onUpdate}
        onCancel={hide}
        isShown={isShown && action === 'rename'}
        status={status}
        type="update"
        name={name}
      />
    </>

  );
};

export default ChannelMenu;
