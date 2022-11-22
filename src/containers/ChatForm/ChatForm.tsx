import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import ChatBtn from "../../components/ChatBtn/ChatBtn";
import type {DataObject, Messages, Post} from "../../types";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import {Container, Input, TextField} from "@mui/material";

const url = 'http://146.185.154.90:8000/messages';
const lastMessage: DataObject = {};

const ChatForm = () => {
  const [post, setPost] = useState<Post>({
    author: '',
    message: '',
  });

  const [messages, setMessages] = useState<Messages[]>([]);

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();

    const data = new URLSearchParams();
    data.set('message', post.message);
    data.set('author', post.author);

    await fetch(url, {
      method: 'post',
      body: data,
    });
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const author = event.target.value;

    setPost((prev) => (
      {...prev, author: author}
    ));
  };

  const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const message = event.target.value;

    setPost((prev) => (
      {...prev, message: message}
    ));
  };

  const getMessages = async () => {
    const response = await fetch(url);
    const newMessages: Messages [] = await response.json();

    newMessages.forEach((elem) => {
      setMessages((prev) => [...prev, elem]);
    });

    lastMessage.time = newMessages[newMessages.length - 1].datetime;
  };

  const getNewMessages = async () => {
    const newMessagesUrl = url + '?datetime=' + lastMessage.time;
    const response = await fetch(newMessagesUrl);
    const newMessages: Messages [] = await response.json();

    newMessages.forEach((elem) => {
      setMessages((prev) => [...prev, elem]);
    });

    if (newMessages.length !== 0) {
      lastMessage.time = newMessages[newMessages.length - 1].datetime;
    }
  };

  useEffect(() => {
    getMessages().catch(console.error)
  }, []);

  useEffect(() => {
    setInterval(() => {
      getNewMessages().catch(console.error);
    }, 2000)
  }, []);

  return (
    <Container maxWidth={"xl"}>
      <form
        className="ChatForm"
        onSubmit={sendMessage}
        style={{display: 'flex', flexDirection: 'column'}}>
        <Input
          className="UserName"
          onChange={onInputChange}
          placeholder="Enter your name:"
          sx={{m: 2}}
        />
        <TextField
          id="standard-basic"
          label="Message:"
          variant="standard"
          className="UserMessage"
          onChange={onTextareaChange}
          sx={{m: 2}}
        />
        <ChatBtn btnName={"Send"} key={Math.random()}/>
      </form>
      <div
        className="Messages"
        style={{display: 'flex', flexDirection: 'column-reverse'}}>
        {messages.map((elem) => {
          return <ChatMessage
            author={elem.author}
            message={elem.message}
            date={elem.datetime}
            key={elem._id + Math.random().toString()}/>
        })}
      </div>
    </Container>
  );
};

export default ChatForm;