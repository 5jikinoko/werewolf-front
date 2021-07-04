import React from "react";
import ReactDOM from "react-dom";
import './index.css';

import { useState } from "react";

function RoomMake () {
  const[roomName, setRoomName] = useState("");
  const[peopleLimid, setPeopleLimid] = useState(10);
  const[passwordExsit, setPasswordExsit] = useState(false);
  const[password, setPassword] = useState("");
  const[intro, setIntro] = useState("");

  //作成ボタンのクリック時動作
  const hundleClickMake = () => {
    var i = 0;
    if (roomName === "") {
      alert("部屋の名前を入力してください");
      i = 1;
    }
    if (roomName.length > 10) {
      alert("部屋の名前は文字以内にしてください");
      i = 1;
    }
    if (passwordExsit === true) {
      if(passwordExsit === ""){
        alert("パスワードを入力してください");
        i = 1;
      }
      if(passwordExsit.length >= 16){
        alert("パスワードを15文字以内にしてください");
        i = 1;
      }
    }
    if(intro.length >= 1000){
      alert("紹介分が長すぎます");
      i = 1;
    }
    
    if(i === 1){
      return;
    }
    else{
      let fd = new FormData();
      fd.set("roomName", setRoomName);
      fd.set("peopleLimid", setPeopleLimid);
      fd.set("passwordExsit", setPasswordExsit);
      fd.set("password", setPassword);
      fd.set("intro", setIntro);

      //サーバに送信
      fetch("/gameSettings-registry", {
      method: "PUT",
      body: fd
      })
      .then((response) => {
        const status = response.status;
        console.log(status);
      })
      .catch((error) => {
        console.error(error);
      });
      //チャットルームに移動
      location.href="url";
    }
  }
  
  //前のページに戻る
  const hundleClickBack = () => {
    location.href="url"; 
  }

  const passElement = (isVisible) => {
    if (isVisible === true) {
      return (
        <div>
          パスワード：
          <input id="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />
        </div>
      )
    };
    return ;
  }


    return (
      <div className="container">
        <div className="center-area">
          <div className="box1">
            <div className="statu">
              部屋設定
            </div>
            <div className="box2">
              <div>
                部屋の名前：
                <input id="roomName" value={roomName} onChange={(event) => {setRoomName(event.target.value)}} />
              </div>
              <div>
                人数制限　：　　　
                <select id="peopleLimid" value={peopleLimid} onChange={(event) => {setPeopleLimid(event.target.value)}}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10" selected>10</option>
                </select>
              </div>
              <div>
                パスワードあり：
                <input type="checkbox" id="passwordExsit"  checked={passwordExsit} onChange={() => {setPasswordExsit(!passwordExsit)}} /> 
              </div>
                {passElement(passwordExsit)}
              <div>
                <p><u>紹介文</u></p>
                <textarea id="intro" rows="10" cols="34" value={intro} onChange={(event) => {setIntro(event.target.value)}} />
              </div>
            </div>
            <div className="Buttons">
              <button className="box3" onClick={ () => hundleClickMake()} type="button">OK</button>
              <button className="box3" onClick ={ () => hundleClickBack()} type="button">キャンセル</button>
            </div>
          </div>
        </div>
      </div>
    );
}

ReactDOM.render(
  <RoomMake />,
  document.getElementById('root')
);
