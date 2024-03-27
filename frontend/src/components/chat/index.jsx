import Channel from './Channel';
import Channels from './Channels';

const Chat = (props = {}) => {
  const {
    style = {
      width: 1024,
      height: 512,
    },
  } = props;

  return (
    <div
      className="row bg-body-tertiary border d-inline-flex"
      style={style}
    >
      <div className="col-3 bg-body-secondary p-4">
        <Channels />
      </div>
      <div className="col h-100 p-0">
        <div className="h-100">
          <Channel />
        </div>
      </div>
    </div>
  );
};

export default Chat;
