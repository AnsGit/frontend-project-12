import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery } from '../../services/api/channels';
import { chooseChannel } from '../../store/channel';
import SocketContext from '../../services/socket';
import ChannelsMenu from './ChannelsMenu';

// const scrollToChannel = (ref, channelID) => {
//   if (!ref.current) return;

//   const channelEl = ref?.current?.querySelector(`[href='#${channelID}']`);
//   if (!channelEl) return;

//   ref?.current?.scrollTo(0, channelEl.offsetTop);
// };

const Channels = () => {
  const { t } = useTranslation();

  const {
    data: channels,
    isSuccess: isChannelsDataLoaded,
    refetch,
    // status: channelsLoadingStatus,
  } = useGetChannelsQuery();

  const curChannelID = useSelector((state) => state.channel.data.id);
  const dispatch = useDispatch();

  const channelsRef = useRef();

  const chooseDefaultChannel = () => dispatch(chooseChannel(channels[0]));
  // const onAddChannel = () => scrollToChannel(channelsRef, curChannelID);

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!isChannelsDataLoaded) return;

    chooseDefaultChannel();
    // eslint-disable-next-line
  }, [isChannelsDataLoaded]);

  // useEffect(() => {
  //   if (channelsLoadingStatus !== 'fulfilled') return;

  //   scrollToChannel(channelsRef, curChannelID);
  // }, [
  //   channelsLoadingStatus,
  //   curChannelID,
  // ]);

  useEffect(() => {
    socket.on('connect', () => {
      // subscribe new channel
      socket.on('newChannel', () => refetch());
      // subscribe remove channel
      socket.on('removeChannel', ({ id }) => {
        if (id === curChannelID) chooseDefaultChannel();

        refetch();
      });
      // subscribe rename channel
      socket.on('renameChannel', () => refetch());
    });
    // eslint-disable-next-line
  }, []);

  if (!isChannelsDataLoaded) return null;

  return (
    <div className="col d-flex flex-column h-100">
      <div className="row mb-3">
        <div className="col fs-5 text-start">
          {t('channels')}
        </div>
        <ChannelsMenu />
      </div>
      <div ref={channelsRef} className="row overflow-auto position-relative">
        <div className="list-group p-0 text-start">
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
                {`# ${name}`}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Channels;
