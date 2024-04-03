import { useSelector } from 'react-redux';
import {
  useRef, useEffect, useContext, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetMessagesQuery,
  useAddMessageMutation,
} from '../../services/api/messages';
import MessageForm from '../forms/MessageForm.jsx';
import { SocketContext } from '../../services/socket';
import { ToastContext } from '../toastify.jsx';

const Channel = () => {
  const { t } = useTranslation();
  const { notify } = useContext(ToastContext);

  const {
    data: messages,
    isError: isMessagesLoadingError,
    isSuccess: isMessagesDataLoaded,
    refetch,
    status: messagesLoadingStatus,
  } = useGetMessagesQuery();

  const [
    addMessage,
    {
      isSuccess: isMessageAdded,
      isError: isMessageAdditionError,
    },
  ] = useAddMessageMutation();

  const [status, setStatus] = useState('pending');

  const curChannelID = useSelector((state) => state.channel.data.id);
  const user = useSelector((state) => state.user);

  const messagesRef = useRef();

  const socket = useContext(SocketContext);

  const onAddMessage = (data, { resetForm }) => {
    setStatus('sending');

    addMessage({
      ...data,
      channelId: curChannelID,
      username: user.username,
    }).then(resetForm);
  };

  useEffect(() => {
    if (isMessageAdditionError) {
      notify('error', t('toastify.error-message-save'));
      return;
    }

    if (isMessageAdded) {
      setStatus('pending');
      refetch();
    }
    // eslint-disable-next-line
  }, [isMessageAdded, isMessageAdditionError, refetch]);

  useEffect(() => {
    if (messagesLoadingStatus !== 'fulfilled') return;

    messagesRef?.current?.scrollTo(0, messagesRef.current.scrollHeight);
  }, [
    messagesLoadingStatus,
    curChannelID,
  ]);

  useEffect(() => {
    if (!isMessagesLoadingError) return;
    notify('error', t('toastify.error-loading-messages'));
    // eslint-disable-next-line
  }, [isMessagesLoadingError]);

  useEffect(() => {
    socket.on('connect', () => {
      // subscribe new message
      socket.on('newMessage', refetch);
    });
    // eslint-disable-next-line
  }, []);

  if (!isMessagesDataLoaded) return null;
  if (curChannelID === null) return null;

  const channelMessages = messages.filter(({ channelId }) => channelId === curChannelID);

  return (
    <div className="col position-relative h-100">
      <div ref={messagesRef} className="row overflow-auto h-75 w-100 m-0">
        <div className="list-group p-4">
          {channelMessages.map(({ id, body, username }) => (
            <div
              key={id}
              className="row mb-3"
            >
              <span className="fw-bold text-start">
                {username}
              </span>
              <span className="text-start">
                {body}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="row w-100 h-25 bg-secondary-subtle m-0 align-items-center">
        <MessageForm onSubmit={(onAddMessage)} status={status} />
      </div>
    </div>
  );
};

export default Channel;
