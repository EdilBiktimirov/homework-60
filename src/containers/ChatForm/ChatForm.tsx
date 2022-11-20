import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import ChatBtn from "../../components/ChatBtn/ChatBtn";
import type {Messages, Post} from "../../types";
import ChatMessage from "../../components/ChatMessage/ChatMessage";

interface Props {}

type dataObject = {
  time?: string
}

const url = 'http://146.185.154.90:8000/messages';
const lastMessage: dataObject = {};


const ChatForm = () => {

  const [post, setPost] = useState<Post>({
  author: '',
  message: '',
  })


  const [messages, setMessages] = useState<Messages[]>([]);

  const sendMessage = async (event: FormEvent) => {
event.preventDefault();
    const data = new URLSearchParams();
    data.set('message', post.message);
    data.set('author', post.author);

    const response = await fetch(url, {
      method: 'post',
      body: data,
    });

    console.log(response);
    console.log('send');


  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const author = event.target.value;
    // const message = event.target.value;

    setPost((prev) => (
      {...prev, author: author}
    ))

    // console.log(post);
  }

  const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // const author = event.target.value;
    const message = event.target.value;

    setPost((prev) => (
      {...prev, message: message}
    ))

    // console.log(post);
  }

  const getMessages = async () => {

    // const copyMessages = [...messages];
    // copyMessages.forEach((elem,index) => {
    //   copyMessages.splice(index, 1);
    // });
    // setMessages(prev => prev = copyMessages);

    const response = await fetch(url);
    const newMessages: Messages [] = await response.json();

    newMessages.forEach((elem) => {
      setMessages((prev) => [...prev, elem]);
    })

    lastMessage.time = newMessages[newMessages.length - 1].datetime;
    // console.log(lastMessage.time);
  }

  const getNewMessages = async () => {
    const newMessagesUrl = url + '?datetime=' + lastMessage.time;
    const response = await fetch(newMessagesUrl);
    const newMessages: Messages [] = await response.json();

      console.log(lastMessage);
      console.log(newMessages);

      // if (newMessages.length !== 0) {
        newMessages.forEach((elem) => {
          // if (elem._id !== messages[messages.length - 1]._id) {
            setMessages((prev) => [...prev, elem]);
          // }
        })
      // }

    if(newMessages.length !== 0) {
      lastMessage.time = newMessages[newMessages.length - 1].datetime;
      console.log(lastMessage);
    }
  }

  useEffect(() => {
    getMessages().catch(console.error)
  }, []);
  console.log(messages)

    useEffect(() => {

      setInterval(() => {
        getNewMessages().catch(console.error);
      }, 10000)
    }, []);



  return (
    <>

      <form className="ChatForm" onSubmit={sendMessage}>
        <label>
          Name:
          <input className="UserName" onChange={onInputChange}/>
        </label>
        <label>
          Message:
          <textarea className="UserMessage" onChange={onTextareaChange}></textarea>
        </label>

        <ChatBtn btnName={"Send"}/>
      </form>

      {messages.map((elem) => {
          return <ChatMessage author={elem.author} message={elem.message} date={elem.datetime} key={elem._id}/>
      })}
    </>
  );
};

export default ChatForm;