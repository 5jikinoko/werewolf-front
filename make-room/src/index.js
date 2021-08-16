/*
部屋の設定を入力してもらい部屋を立てる
成松
*/
import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import ProfileModal from "./Profile-modal";

import { useState } from "react";

function RoomMake () {
  const[roomName, setRoomName] = useState("");
  const[peopleLimid, setPeopleLimid] = useState(10);
  const[passwordExsit, setPasswordExsit] = useState(false);
  const[password, setPassword] = useState("");
  const[intro, setIntro] = useState("");

  //作成ボタンのクリック時動作
  const hundleClickMake = () => {
    let i = 0;
    if (roomName === "") {
      alert("部屋の名前を入力してください");
      i = 1;
    }
    if (roomName.length > 10) {
      alert("部屋の名前は10文字以内にしてください");
      i = 1;
    }
    if (passwordExsit === true) {
      if(password === ""){
        alert("パスワードを入力してください");
        i = 1;
      }
      if(password.length >= 16){
        alert("パスワードを15文字以内にしてください");
        i = 1;
      }
    }
    if(intro === "") {
      alert("紹介文を入力して下さい");
      i = 1;
    } else if(intro.length > 500){
      alert("紹介文が長すぎます\n500文字までです");
      i = 1;
    }
    
    if(i === 1){
      return;
    }
    else{
      let fd = new FormData();
      fd.set("roomName", roomName);
      fd.set("maxMember", peopleLimid);
      if (passwordExsit) {
        fd.set("pass", password);
      } else {
        fd.set("pass", "");
      }
      fd.set("introduction", intro);

      //サーバに送信
      fetch("http://160.16.141.77:51000/room-set-up", {
      method: "POST",
      body: fd
      })
      .then((response) => {
        const status = response.status;
        console.log(status);
        if (status === 200) {
          //チャットルームに移動
          window.location.href="http://160.16.141.77:51000/game-chat";
        } else if (status === 466) {
          alert("プロフィールを登録してください");
        } else if (status === 496) {
          alert("範囲外の値");
        } else if (status === 497) {
          alert("UUIDが存在しません。プロフィールを登録してください");
        } else if (499) {
          alert("入力が不正");
        } else {
          alert("その他エラー");
        }
      })
      .catch((error) => {
        console.error(error);
      });
      
      
    }
  }
  
  //前のページに戻る
  const hundleClickBack = () => {
    window.location.href="http://160.16.141.77:51000/search-room";
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
      <div>
      <ProfileModal/>
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
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
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
      </div>
    );
}

ReactDOM.render(
  <RoomMake />,
  document.getElementById('root')
);