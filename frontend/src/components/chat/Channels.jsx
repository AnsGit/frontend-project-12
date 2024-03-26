import cn from 'classnames';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery } from '../../services/api/channels';
import { chooseChannel } from '../../store/channel';

const Channels = () => {
  const { data: channels, isLoading } = useGetChannelsQuery();

  const curChannelID = useSelector((state) => state.channel.data.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && channels.length) {
      dispatch(chooseChannel(channels[0]));
    }
    // eslint-disable-next-line
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <div className="list-group">
      {channels.map((channel) => {
        const { id, name } = channel;

        const className = cn(
          'list-group-item',
          'list-group-item-action',
          { active: id === curChannelID },
        );

        return (
          <a
            key={id}
            href={`#${id}`}
            className={className}
            onClick={() => dispatch(chooseChannel(channel))}
          >
            {name}
          </a>
        );
      })}
    </div>
  );
};

export default Channels;
