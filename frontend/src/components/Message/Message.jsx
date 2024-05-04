// Mostra a mensagem de erro do backend

import "./Message.css";

const Message = ({ msg, type }) => {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
