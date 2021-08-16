/*
チャットの内容を受け取り表示する。一般チャット・人狼チャット・墓場チャットの切り替えも行う。ユーザが入力したチャットを送信する
工藤
*/
import ReactDOM from 'react-dom';
import './index.css';
//import React from 'react';
import React, { Component, useEffect, useRef, useState, Fragment} from "react";


//import { render } from 'react-dom';
/*
const testJason = [{userName: "aa", icon: 1}, {userName: "bb", icon: 2}, {userName: "cc", icon: 3}]

 const testfaunc = () => {
   let obj = {};
   testJason.map( t => {
    obj[t.userName] = t.icon
   });
   console.log(obj);
   testJason.map(t => {
     console.log(obj[t.userName]);
   })
   return obj;
 }
*/

const getCookie = (key) => {
    let result = null;
    const plainCookie = document.cookie;
    if(plainCookie !== "") {
      let allCookies = plainCookie.split("; ");
      for (let i = 0; i < allCookies.length; ++i) {
        const cookie = allCookies[i].split("=");
        if (cookie[0] === key) {
          result = cookie[1];
          break;
        }
      }
    }
    return result;
  }

const ChatForm = (props) =>  {
    const [text, setText] = useState("");

    const handleButton = (inputText) => {
      const channel = props.channel;
      const chatPermission = props.chatPermission;

      //そのチャンネルの書き込み権限を持っているかチェック
      if (channel === 0) {
        if ( !chatPermission.generalChatWritingPermission ) return;
      } else if (channel === 1){
        if ( !chatPermission.werewolfChatWritingPermission ) return;
      } else if (channel === 2) {
        if ( !chatPermission.graveChatWritingPermission ) return;
      }

      const ok = props.sendMessage(inputText);
      if (ok) {
        setText("");
      }
    //console.log("handlebutton" + inputText + this.state.text);
    }

    const buttonText = () => {
      const channel = props.channel;
        if (channel === 0) {
            return "一般チャットで";
        } else if (channel === 1) {
            return "人狼チャットで";
        } else if (channel === 2) {
            return "墓場チャットで";
        } else {
          console.log("buttonTextでエラーchannel:" + channel);
          return "エラー";
        }
    };

    return(
      <form  className="chat-form">
        <textarea onChange={(event) => {setText(event.target.value)}} value={text} className="chat-input" id="input-chat" rows="5" warp="hard"></textarea>
        <button onClick={() => handleButton(text)} className="chat-button" type="button" >{buttonText()}<br/>発言</button>
      </form>
    );
}

function Chat(props) {
  return (
    <div className="chat-gutter">
      <div className="chat-contents-left">
        <img src={'http://160.16.141.77:51000/' + props.icon + '.png'} className="user-icon"/>
      </div>
      <div className="chat-contents-right">
        <div className="user-name">
            {props.userName}
        </div>
        <div className="chat-text">
            {props.text}
        </div>
      </div>
    </div>
  );
}



const Chats = (props) => {
  const chatsEl = useRef(null);
  const messages = props.messages;

  useEffect(() => {
    chatsEl.current.scrollIntoView();
    //testDict();
  }, [messages.length]);

  const getIcon = (userName) => {
    return props.nameIconDict[userName];
  }
/*
  const testDict = () => {
    const nameIconDict = props.nameIconDict;
    console.log("テスト辞書")
    console.log(nameIconDict)
    props.messages.map(t => {
      console.log(nameIconDict[t.userName]);
    })
  }
*/
  return (
    <div className="scroll-area" ref={chatsEl}>
      {messages.map( (message, index) => (
        <Chat key={index} userName={message.userName} icon={getIcon(message.userName)} text={message.text} />
      ))}
    </div>
  );
}

export default function ChatArea(props) {
/*
  useEffect(() => {
    console.log("テスト２");
    console.log(props.nameIconDict);
  }, []);
*/
    return(
        <div className="chat-area">
            <div className="channels">
                <button type="button" className="channel-name" onClick={() => props.switchChannel(0)} style={props.channel === 0 ? {backgroundColor: "orange"} : {backgroundColor: "aliceblue"}} >一般チャット</button>
                <button type="button" className="channel-name" onClick={() => props.switchChannel(1)} style={props.channel === 1 ? {backgroundColor: "orange"} : {backgroundColor: "aliceblue"}}>人狼チャット</button>
                <button type="button" className="channel-name" onClick={() => props.switchChannel(2)} style={props.channel === 2 ? {backgroundColor: "orange"} : {backgroundColor: "aliceblue"}}>墓場チャット</button>
            </div>
            <div className="chat-container">
                <Chats messages={props.messages} nameIconDict={props.nameIconDict}/>
            </div>
            <ChatForm channel={props.channel} sendMessage={props.sendMessage} chatPermission={props.chatPermission}/>
        </div>
    );
}