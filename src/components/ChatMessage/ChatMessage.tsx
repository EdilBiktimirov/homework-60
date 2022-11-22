import React from 'react';
import {Card} from "@mui/material";

interface Props {
  author: string;
  message: string;
  date: string;
}

const ChatMessage: React.FC<Props> = ({author, message, date}) => {

  return (
    <Card
      className="ChatMessage"
      variant="outlined"
      sx={{m: 1, textAlign: 'left', p: 2}}>
      <p>From: {author} ({date})</p>
      <p>Message: {message}</p>
    </Card>
  );
};

export default ChatMessage;