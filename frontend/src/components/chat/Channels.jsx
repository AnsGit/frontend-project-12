import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import filter from 'leo-profanity';
import { useGetChannelsQuery } from '../../services/api/channels';
import { chooseChannel } from '../../store/channel';
import { SocketContext, handleSocketErrors } from '../../services/socket';
import { ToastContext } from '../toastify.jsx';
import ChannelsMenu from './ChannelsMenu';
import ChannelMenu from './ChannelMenu';

// const scrollToChannel = (ref, channelID) => {
//   if (!ref.current) return;

//   const channelEl = ref?.current?.querySelector(`[href='#${channelID}']`);
//   if (!channelEl) return;

//   ref?.current?.scrollTo(0, channelEl.offsetTop);
// };

const Channels = () => {
  const { t } = useTranslation();
  const { notify } = useContext(ToastContext);

  const {
    data: channels,
    isSuccess: isChannelsDataLoaded,
    isError: isChannelsLoadingError,
    refetch: refetchChannels,
    // status: channelsLoadingStatus,
  } = useGetChannelsQuery();

  const curChannelID = useSelector((state) => state.channel.data.id);

  const dispatch = useDispatch();

  const channelsRef = useRef();

  const chooseDefaultChannel = () => dispatch(chooseChannel(channels[0]));
  // const onAddChannel = () => scrollToChannel(channelsRef, curChannelID);

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (isChannelsLoadingError) {
      notify('error', t('toastify.error-loading-channels'));
      return;
    }

    if (!isChannelsDataLoaded) return;

    chooseDefaultChannel();
    // eslint-disable-next-line
  }, [isChannelsDataLoaded, isChannelsLoadingError]);

  // useEffect(() => {
  //   if (channelsLoadingStatus !== 'fulfilled') return;

  //   scrollToChannel(channelsRef, curChannelID);
  // }, [
  //   channelsLoadingStatus,
  //   curChannelID,
  // ]);

  useEffect(() => {
    if (!channels) return;

    const isCurrentChannelDeleted = channels.every(({ id }) => id !== curChannelID);

    if (isCurrentChannelDeleted) chooseDefaultChannel();
    // eslint-disable-next-line
  }, [channels]);

  useEffect(() => {
    socket.on('connect', () => {
      // subscribe new channel
      socket.on('newChannel', () => refetchChannels());
      // subscribe remove channel
      socket.on('removeChannel', () => refetchChannels());
      // subscribe rename channel
      socket.on('renameChannel', () => refetchChannels());
    });

    handleSocketErrors(socket, () => notify('error', t('toastify.error-data-synchronization')));
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
      <div ref={channelsRef} className="row overflow-auto position-relative h-100">
        <div className="list-group p-0 text-start">
          {channels.map((channel) => {
            const { id, name, removable } = channel;
            const isActive = id === curChannelID;

            const className = cn(
              'rounded-3',
              'd-flex',
              'p-0',
              'mb-1',
            );

            const btnClassName = cn(
              'list-group-item',
              'btn-primary',
              'w-100',
              'text-start',
              { active: isActive, 'rounded-end-0': removable },
            );

            const btnName = filter.clean(name);

            return (
              <div
                key={id}
                role="group"
                className={className}
              >
                <Button
                  className={btnClassName}
                  name={btnName}
                  onClick={() => dispatch(chooseChannel(channel))}
                >
                  <span className="me-1">#</span>
                  {btnName}
                </Button>

                {removable && <ChannelMenu id={id} name={name} />}
              </div>

            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Channels;
