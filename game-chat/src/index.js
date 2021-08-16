/*
他のM6のモジュールが表示するものをまとめる。webソケットのコネクションを確立して、メッセージを受信したら　に渡す。ゲームの情報と、自分のステータスもフェーズごとにgetする。
工藤
*/
import ReactDOM from 'react-dom';
import './index.css';
//import React from 'react';
import React, { Component, useEffect, useRef, useState, Fragment} from "react";
import ChatArea from './chat';
import UsersStatus from './users-status';
import Action from './action';
import ShowPhase from './show-phase';
import MenuModal from './menu-modal';

//import { render } from 'react-dom';

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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generalMessages: [],
      werewolfMessages: [],
      graveMessages: [],
      actionLog: [],
      icon: getCookie("icon"),
      //Todo
      UUID: getCookie("UUID"),
      //UUID: "46453234-dd1f-4ecc-abb7-ecfca363689f",
      userName: getCookie("userName"),
      ws: null,
      channel: 0,
      chatPermission: {
        generalChatWritingPermission: true,
        werewolfChatReadingPermission: true,
        werewolfChatWritingPermission: false,
        graveChatReadingPermission: true,
        graveChatWritingPermission: false
      },
      myRole: "",
      alive: true,
      statusList :[],
      nameIconDict :{},
      nextPhaseTime: 0,
      nowPhase: 0,
      day: 1,
      completeAction: true,
      gameSettings: {
        discussionTime: 180, votingTime: 60, nightTime: 120, willTime: 60,
        tieVoteOption: 0, werewolfChatSwitch: 1, firstNightSee: 2,
        canSeeMissingPosition: false, isSecretBallot: false, 
        canContinuousGuard: false, isRandomStealing: true, isOneNight:false
      },
      roleBreakdown: {
        villagersNum: 5,
        seersNum: 1,
        necromancersNum: 1,
        knightsNum: 1,
        huntersNum: 0,
        blackKnightsNum: 0,
        freemasonariesNum: 0,
        bakersNum: 1,
        werewolvesNum: 2,
        madmenNum: 0,
        traitorsNum: 0,
        foxSpiritsNum: 0,
        foolsNum: 0,
        phantomThievesNum: 0,
      },
    };
    this.switchChannel = this.switchChannel.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getGameInfo = this.getGameInfo.bind(this);
    this.getMyStatus = this.getMyStatus.bind(this);
    this.getGameSettings = this.getGameSettings.bind(this);
    this.makeDict = this.makeDict.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.setCompleteAction = this.setCompleteAction.bind(this);
  }

  componentDidMount() {
    //let ws = new WebSocket("ws://160.16.141.77:51000/websocket");
    let ws = new WebSocket("ws://160.16.141.77:51000/websocket");
    
    ws.onopen = () => {
      console.log('connected')
      this.setState({ ws: ws });
    }
    ws.onmessage = (m) => {
      const jsonMessage = JSON.parse(m.data);
      const channel = jsonMessage.channel;
      //他プレイヤーからのチャットならば対応するチャットに追加
      if (channel === 0) {
        const messages = this.state.generalMessages.slice();
        const newMessage = {userName: jsonMessage.userName, text: jsonMessage.text};
        this.setState({
          generalMessages: messages.concat(newMessage)
        });
      } else if (channel === 1) {
        const messages = this.state.werewolfMessages.slice();
        const newMessage = {userName: jsonMessage.userName, text: jsonMessage.text};
        this.setState({
          werewolfMessages: messages.concat(newMessage)
        });
      } else if (channel === 2) {
        const messages = this.state.graveMessages.slice();
        const newMessage = {userName: jsonMessage.userName, text: jsonMessage.text};
        this.setState({
          graveMessages: messages.concat(newMessage)
        });
      }//GMからのメッセージ 
      else if (channel === -1) {
        const messages = this.state.generalMessages.slice();
        const newMessage = {userName: "GM", text: jsonMessage.text};
        this.setState({
          generalMessages: messages.concat(newMessage)
        });
      } else if (channel === -2) {
        const messages = this.state.generalMessages.slice();
        const newMessage = {userName: "GM", text: jsonMessage.text};
        this.setState({
          generalMessages: messages.concat(newMessage)
        });

        const getGameInfo = this.getGameInfo;
        const getMyStatus = this.getMyStatus;

        getMyStatus();
        console.log("処理2完了");
        getGameInfo();
        console.log("処理1完了");
      } else if (channel === -3) {
        const messages = this.state.actionLog.slice();
        const newMessage = jsonMessage.text;
        this.setState({
          actionLog: messages.concat(newMessage)
        });
        console.log(messages.concat(newMessage));
      } else if (channel == -4) {
        const messages = this.state.generalMessages.slice();
        const newMessage = {userName: "GM", text: jsonMessage.text};
        this.setState({
          generalMessages: messages.concat(newMessage)
        });
        this.getGameSettings();
      } else if (channel === -666) {
        alert("部屋主によって部屋が解散しました");
        window.location.href = "/search-room";
      }
    }

    ws.onclose = () => {
      alert("通信が止まりました");
    }

    this.getGameSettings();
  }

  getGameInfo() {
    fetch("http://160.16.141.77:51000/game-info")
    .then(response => response.json())
    .then( json => {
      console.log(json);
      const nowPhase = json.nowPhase;
      this.setState({
        statusList: json.statusList,
        nextPhaseTime: new Date(json.nextPhaseTime),
        nowPhase: nowPhase,
        day: json.day
      });
      if (nowPhase === 1 || nowPhase === 3 || nowPhase === 5) {
        this.setState({
          completeAction: false
        })
      }
      this.makeDict(json.statusList);
    }).then(() => {
      this.switchChannel(0);
      console.log("処理3完了");
    })
  }

  makeDict(statusList) {
    const dict = {};
    statusList.map( t => {
      dict[t.name] = t.icon
    });
    dict["GM"] = "GM";
    console.log("make dict!");
    console.log(dict);
    this.setState({
      nameIconDict: dict
    });
  }

  getMyStatus() {
    fetch("http://160.16.141.77:51000/my-status")
    .then(response => response.json())
    .then( json => {
      this.setState({
        myRole: json.status.role,
        alive: json.status.alive,
        chatPermission: json.chatPermission
      });
      console.log(json);
    });
  }

  getGameSettings() {
    fetch("http://160.16.141.77:51000/gameSettings")
    .then(response => response.json())
    .then( json => {
      if (json.gameSettings !== null && json.roleBreakdown !== null) {
        const gameSettings = json.gameSettings;
        const roleBreakdown = json.roleBreakdown;
        this.setState({
          gameSettings: gameSettings,
          roleBreakdown: roleBreakdown,
        });
      } else {
        const gameSettings = {
          discussionTime: 180, votingTime: 60, nightTime: 120, willTime: 60,
          tieVoteOption: 0, werewolfChatSwitch: 1, firstNightSee: 2,
          canSeeMissingPosition: false, isSecretBallot: false, 
          canContinuousGuard: false, isRandomStealing: true, isOneNight:false
        }
        const roleBreakdown = {
          villagersNum: 5,
          seersNum: 1,
          necromancersNum: 1,
          knightsNum: 1,
          huntersNum: 0,
          blackKnightsNum: 0,
          freemasonariesNum: 0,
          bakersNum: 1,
          werewolvesNum: 2,
          madmenNum: 0,
          traitorsNum: 0,
          foxSpiritsNum: 0,
          foolsNum: 0,
          phantomThievesNum: 0,
        }
        console.log(gameSettings);
        this.setState({gameSettings: gameSettings, roleBreakdown: roleBreakdown});
      }
    })
  }

  componentWillUnmount() {
    const ws = this.state.ws;
    if (ws.readyState === WebSocket.CLOSED) return;
    const message = {channel: -1, userUUID: this.state.UUID, text: ""}
    const jsonMessage = JSON.stringify(message);
    ws.send(jsonMessage);
    ws.close();
  }

  setSettings(gameSettings, roleBreakdown) {
    this.setState({
      roleBreakdown: roleBreakdown,
      gameSettings: gameSettings
    });
  }

  setCompleteAction(isFinish) {
    this.setState({
      completeAction: isFinish
    });
  }

  sendMessage(text) {
    const ws = this.state.ws;
    //接続が内なら送信しない
    if (ws === null || ws.readyState === WebSocket.CLOSED) return false;

    const message = {userUUID: this.state.UUID, channel: this.state.channel, text: text};
    const jsonMessage = JSON.stringify(message);
    ws.send(jsonMessage);
    return true;
  }

  switchChannel(c) {
    console.log("switchChannel:" + c);
    const chatPermission = this.state.chatPermission;
    //一般チャットに切り替え
    if (c === 0) {
      this.setState({
        channel: 0
      });
    }//人狼チャットに切り替え
    else if (c === 1 && chatPermission.werewolfChatReadingPermission) {
      this.setState({
        channel: 1
      });
    }//墓場チャットに切り替え
    else if (c === 2 && chatPermission.graveChatReadingPermission) {
      this.setState({
        channel: 2,
      });
    }
  }

  render() {
    const channel = this.state.channel;
    let messages;
    if (channel === 0) {
      messages = this.state.generalMessages;
    } else if (channel === 1) {
      messages = this.state.werewolfMessages
    } else if (channel === 2) {
      messages = this.state.graveMessages;
    } else {
      console.log("エラー　channel:" + channel);
    }
    return(
      <div className="main">
        <div className="left-bar">
          <UsersStatus users={this.state.statusList} />
        </div>
        <div className="center-area">
          <div className="center-header">
            <ShowPhase nextPhaseTime={this.state.nextPhaseTime} nowPhase={this.state.nowPhase}
              day={this.state.day} />
            <div className="nmpty"></div>
            <MenuModal gameSettings={this.state.gameSettings} roleBreakdown={this.state.roleBreakdown} setSettings={this.setSettings}/>
          </div>
          <ChatArea messages={messages} channel={channel} sendMessage={this.sendMessage} switchChannel={this.switchChannel}
          chatPermission={this.state.chatPermission} nameIconDict={this.state.nameIconDict}/>
        </div>
        <div className="right-bar">
          <Action actionLog={this.state.actionLog} myRole={this.state.myRole} myName={this.state.userName} alive={this.state.alive}
          nowPhase={this.state.nowPhase} statusList={this.state.statusList} gameSettings={this.state.gameSettings}
          completeAction={this.state.completeAction} setCompleteAction={this.setCompleteAction}/>
        </div>
      </div>
    );
  }
}



ReactDOM.render(<App />, document.getElementById('root'));