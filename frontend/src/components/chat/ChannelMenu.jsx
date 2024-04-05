import { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ToastContext } from '../toastify.jsx';
import { ChannelEditionForm, ChannelDeletionForm } from '../forms';
import {
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} from '../../services/api/channels.js';

import {
  useGetMessagesQuery,
  useDeleteMessageMutation,
} from '../../services/api/messages.js';

const ChannelMenu = (props = {}) => {
  const { id, name } = props;

  const { t } = useTranslation();
  const { notify } = useContext(ToastContext);

  const {
    data: messages,
    isSuccess: isMessagesDataLoaded,
    isError: isMessagesLoadingError,
    // refetch: refetchMessages,
    // status: messagesLoadingStatus,
  } = useGetMessagesQuery();

  const [
    deleteMessage,
    // {
    //   isError: isMessageDeletionError,
    //   isSuccess: isMessageDeleted,
    //   isUninitialized: isMessageDeletionUninitialized,
    //   data: deletedMessageData,
    // },
  ] = useDeleteMessageMutation();

  const [
    updateChannel,
    {
      isError: isChannelUpdateError,
      isSuccess: isChannelUpdated,
      isUninitialized: isChannelUpdateUninitialized,
      // data: updatedChannelData,
    },
  ] = useUpdateChannelMutation();

  const [
    deleteChannel,
    {
      isError: isChannelDeletionError,
      isSuccess: isChannelDeleted,
      isUninitialized: isChannelDeletionUninitialized,
      // data: deletedChannelData,
    },
  ] = useDeleteChannelMutation();

  const [action, setAction] = useState(null);
  const [isShown, setShown] = useState(false);
  const [status, setStatus] = useState('pending');
  const [deletedChannelID, setDeletedChannelID] = useState(-1);

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

  const onDelete = (data, { resetForm }) => {
    setStatus('sending');
    setDeletedChannelID(id);

    deleteChannel(id).then(resetForm);
  };

  useEffect(() => {
    if (isChannelUpdateUninitialized) return;

    if (isChannelUpdateError) {
      setStatus('error');
      notify('error', t('toastify.error-channel-update'));
      return;
    }

    if (isChannelUpdated) {
      setStatus('pending');
      setShown(false);
      notify('success', t('toastify.success-channel-update'));
    }
    // eslint-disable-next-line
  }, [
    isChannelUpdateUninitialized,
    isChannelUpdateError,
    isChannelUpdated,
  ]);

  useEffect(() => {
    if (isChannelDeletionUninitialized) return;

    if (isChannelDeletionError) {
      setStatus('error');
      notify('error', t('toastify.error-channel-deletion'));
      return;
    }

    if (isChannelDeleted) {
      setStatus('pending');
      setShown(false);
      notify('success', t('toastify.success-channel-deletion'));
    }
    // eslint-disable-next-line
  }, [
    isChannelDeletionUninitialized,
    isChannelDeletionError,
    isChannelDeleted,
  ]);

  useEffect(() => {
    if (!isMessagesDataLoaded) return;
    if (deletedChannelID === -1) return;

    messages.forEach((message) => {
      if (message.channelId !== deletedChannelID) return;
      deleteMessage(message.id);
    });
    // eslint-disable-next-line
  }, [deletedChannelID, messages]);

  useEffect(() => {
    if (!isMessagesLoadingError) return;
    notify('error', t('toastify.error-loading-messages'));
    // eslint-disable-next-line
  }, [isMessagesLoadingError]);

  return (
    <>
      <Dropdown
        as={ButtonGroup}
      >
        <Dropdown.Toggle split className="rounded-start-0 rounded-end-2">
          <span className="visually-hidden">{t('channel-management')}</span>
        </Dropdown.Toggle>

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

      <ChannelEditionForm
        onSubmit={onUpdate}
        onCancel={hide}
        isShown={isShown && action === 'rename'}
        status={status}
        type="update"
        name={name}
      />

      <ChannelDeletionForm
        onSubmit={onDelete}
        onCancel={hide}
        isShown={isShown && action === 'delete'}
        status={status}
        type="delete"
      />
    </>

  );
};

export default ChannelMenu;
