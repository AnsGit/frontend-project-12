import Channel from './Channel';
import Channels from './Channels';

const Chat = () => (
  <div className="row bg-body-tertiary border border-secondary-subtle">
    <div className="col-3 bg-body-secondary p-4">
      <Channels />
    </div>
    <div className="col p-4">
      <Channel />
    </div>
  </div>
);

export default Chat;
