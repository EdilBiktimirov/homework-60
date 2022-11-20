import React from 'react';

interface Props {
  author: string;
  message: string;
  date: string;
}

const ChatMessage: React.FC<Props> = ({author, message, date}) => {
  return (


    <div className="ChatMessage">
      <p>From: {author} ({date})</p>
      <p>Message: {message}</p>
    </div>
  );
};

export default ChatMessage;