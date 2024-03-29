import { useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';
import {
  useGetMessagesQuery,
  useAddMessageMutation,
} from '../../services/api/messages';
import MessageForm from '../forms/MessageForm.jsx';
import SocketContext from '../../services/socket';

const Channel = () => {
  const { data: messages, isLoading, refetch } = useGetMessagesQuery();

  const [
    addMessage,
    addMessageResponse,
  ] = useAddMessageMutation();

  const curChannelID = useSelector((state) => state.channel.data.id);
  const user = useSelector((state) => state.user);

  const socket = useContext(SocketContext);

  const onAddMessage = (data, { resetForm }) => {
    addMessage({
      ...data,
      channelId: curChannelID,
      username: user.username,
    });

    resetForm();
  };

  useEffect(() => {
    if (addMessageResponse.isSuccess) refetch();
  }, [addMessageResponse, refetch]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('CONNECTED!!!');
      // subscribe new message
      socket.on('newMessage', () => refetch());
      // eslint-disable-next-line
    });
  }, []);

  if (isLoading) return null;
  if (curChannelID === null) return null;

  const channelMessages = messages.filter(({ channelId }) => channelId === curChannelID);

  return (
    <div className="col position-relative h-100">
      <div className="row overflow-auto h-75 w-100 m-0">
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
        <MessageForm onSubmit={(onAddMessage)} />
      </div>
    </div>
  );
};

export default Channel;
