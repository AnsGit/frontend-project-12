import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../services/api/messages';

const Channel = () => {
  const { data: messages, isLoading } = useGetMessagesQuery();

  const curChannelID = useSelector((state) => state.channel.data.id);

  if (isLoading) return null;
  if (curChannelID === null) return null;

  const channelMessages = messages.filter(({ channelId }) => channelId === curChannelID);

  return (
    <div className="list-group">
      {channelMessages.map(({ id, name, username }) => (
        <div
          key={id}
          className="row mb-3"
        >
          <span className="fw-bold text-end">
            {username}
          </span>
          <span className="text-end">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Channel;
