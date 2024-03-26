import Channel from './Channel';
import Channels from './Channels';

const Chat = () => (
  <div className="row bg-body-tertiary border">
    <div className="col-3 bg-body-secondary p-4">
      <Channels />
    </div>
    <div className="col overflow-auto" style={{ height: 500 }}>
      <div className="p-4">
        <Channel />
      </div>
    </div>
  </div>
);

export default Chat;
