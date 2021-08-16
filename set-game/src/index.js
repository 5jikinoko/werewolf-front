import React from 'react';
import ReactDOM from 'react-dom';
import Modal, {setAppElement} from "react-modal";
import './index.css';

import { useState } from 'react';

export default function GameSet () {
  const[villagersNum, setVillagersNum] = useState(5);
  const[seersNum, setSeersNum] = useState(1);
  const[necromancersNum, setNecromancersNum] = useState(1);
  const[knightsNum, setKnightsNum] = useState(1);
  const[huntersNum, setHuntersNum] = useState(0);
  const[blackKnightsNum, setBlackKnightsNum] = useState(0);
  const[freemasonariesNum, setFreemasonariesNum] = useState(0);
  const[bakersNum, setBakersNum] = useState(0);
  const[werewolvesNum, setWerewolvesNum] = useState(2);
  const[madmenNum, setMadmenNum] = useState(1);
  const[traitorsNum, setTraitorsNum] = useState(0);
  const[foxSpiritsNum, setFoxSpiritsNum] = useState(0);
  const[foolsNum, setFoolsNum] = useState(0);
  const[phantomThievesNum, setPhantomThievesNum] = useState(0);
  
  const[discussionTime, setDiscussionTime] = useState(180);
  const[votingTime, setvotingTime] = useState(60);
  const[nightTime, setNightTime] = useState(120);
  const[willTime, setWillTime] = useState(60);
  const[tieVoteOption, setTieVoteOption] = useState(0);
  const[werewolfChatSwitch, setWerewolfChatSwitch] = useState(1);
  const[firstNightSee, setFirstNightSee] = useState(2);
  const[canSeeMissingPosition, setCanSeeMissingPosition] = useState(false);
  const[isSecretBallot, setIsSecretBallot] = useState(true);
  const[canContinuousGuard, setCanContinuousGuard] = useState(false);
  const[isRandomStealing, setIsRandomStealing] = useState(true);
  const[isOneNight, setIsOneNight] = useState(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const hundleClick = () => {
    const fd = new FormData();
    fd.set("villagersNum", villagersNum);
    fd.set("seersNum", seersNum)
    fd.set("necromancersNum", necromancersNum);
    fd.set("knightsNum", knightsNum);
    fd.set("huntersNum", huntersNum);
    fd.set("blackKnightsNum", blackKnightsNum);
    fd.set("freemasonariesNum", freemasonariesNum);
    fd.set("bakersNum", bakersNum);
    fd.set("werewolvesNum", werewolvesNum);
    fd.set("madmenNum", madmenNum);
    fd.set("traitorsNum", traitorsNum);
    fd.set("foxSpiritsNum", foxSpiritsNum);
    fd.set("foolsNum", foolsNum);
    fd.set("phantomThievesNum", phantomThievesNum);
    fd.set("discussionTime", discussionTime);
    fd.set("votingTime", votingTime);
    fd.set("nightTime", nightTime);
    fd.set("willTime", willTime);
    fd.set("tieVoteOption", tieVoteOption);
    fd.set("werewolfChatSwitch", werewolfChatSwitch);
    fd.set("firstNightSee", firstNightSee);
    fd.set("canSeeMissingPosition", canSeeMissingPosition);
    fd.set("isSecretBallot", isSecretBallot);
    fd.set("canContinuousGuard", canContinuousGuard);
    fd.set("isRandomStealing", isRandomStealing);
    fd.set("isOneNight", isOneNight);
    
    fetch("/gameSettings-registry", {
      method: "POST",
      body: fd
    })
    .then((response) => {
      const status = response.status;
      if (status === 200) {
        alert("設定を変更しました");
      } else if (status === 497) {
        alert("範囲外の値を入力しています");
      } else if (status === 497) {
        alert("部屋主でないとゲームの設定を変えられません");
      } else if (status === 498) {
        alert("部屋が存在しません");
      } else if (status === 499) {
        alert("入力が不正です");
      } else {
        alert("その他エラー");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const setBeginnerSettings = () => {

  }
  
  return (
    <div>
    <div onClick={() => setIsOpen(true)}>
      ゲームの設定
    </div>
    <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} >
    <div className="container">
      <div className="left-area">
        <h3>役職設定</h3>
        <div>
          村人の数　　　
          <select id="villagersNum" value={villagersNum} onChange={(event) => {setVillagersNum(event.target.value)}}>
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
          </select>
        </div>
        <div>
          占い師の数　　
          <select id="seersNum" required value={seersNum} onChange={(event) => setSeersNum(event.target.value)}>
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
          </select>
        </div>
        <div>
          霊媒師の数　　
          <select name="necromancersNum" required value={necromancersNum} onChange={(event) => setNecromancersNum(event.target.value)}>
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
          </select>
        </div>
        <div>
          騎士の数　　　
          <select id="knightsNum" required value={knightsNum} onChange={(event) => {setKnightsNum(event.target.value)}}>
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
          </select>
        </div>
        <div>
          ハンターの数　
          <select id="huntersNum" required value={huntersNum} onChange={(event) => {setHuntersNum(event.target.value)}}>
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
          </select>
        </div>
        <div>
          黒騎士の数　　
          <select id="blackKnightsNum" required value={blackKnightsNum} onChange={(event) => {setBlackKnightsNum(event.target.value)}}>
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
          </select>
        </div>
        <div>
          共有者の数　　
          <select id="freemasonariesNum" required value={freemasonariesNum} onChange={(event) => {setFreemasonariesNum(event.target.value)}}>
              <option value="0" selected>0</option>
              <option value="2">2</option>
          </select>
        </div>
        <div>
          パン屋の数　　
          <select id="bakersNum" required value={bakersNum} onChange={(event) => {setBakersNum(event.target.value)}}>
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
          </select>
        </div>
        <div>
          人狼の数　　　
          <select id="werewolvesNum" required value={werewolvesNum} onChange={(event) => {setWerewolvesNum(event.target.value)}}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
          </select>
        </div>
        <div>
          狂人の数　　　
          <select id="madmenNum" required value={madmenNum} onChange={(event) => {setMadmenNum(event.target.value)}}>
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
          </select>
        </div>
        <div>
          背信者の数　　
          <select id="traitorsNum" required value={traitorsNum} onChange={(event) => {setTraitorsNum(event.target.value)}}>
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
          </select>
        </div>
        <div>
          妖狐の数　　　
          <select id="foxSpiritsNum" required value={foxSpiritsNum} onChange={(event) => {setFoxSpiritsNum(event.target.value)}}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
          </select>
        </div>
        <div>
          吊人の数　　　
          <select id="foolsNum" required value={foolsNum} onChange={(event) => {setFoolsNum(event.target.value)}}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
          </select>
        </div>
        <div>
          怪盗の数　　　
          <select id="phantomThievesNum" required value={phantomThievesNum} onChange={(event) => {setPhantomThievesNum(event.target.value)}}>
              <option value="0">0</option>
              <option value="1">1</option>
          </select>
        </div>
      </div>
      <div className="center-area">
        <h3>ゲーム設定</h3>
        <div className="dropdown-list">
          議論時間
          <select id="discussionTime" required value={discussionTime} onChange={(event) => {setDiscussionTime(event.target.value)}}>
            <option value="60">60</option>
            <option value="90">90</option>
            <option value="120">120</option>
            <option value="120">180</option>
            <option value="120">210</option>
            <option value="120">240</option>
            <option value="120">270</option>
            <option value="120">300</option>
            <option value="120">330</option>
            <option value="120">360</option>
            <option value="120">390</option>
            <option value="120">420</option>
            <option value="120">450</option>
            <option value="120">480</option>
            <option value="120">510</option>
            <option value="120">540</option>
            <option value="120">570</option>
            <option value="120">600</option>
          </select>
        </div>
        <div>
          投票時間
          <select id="votingTime" required value={votingTime} onChange={(event) => {setvotingTime(event.target.value)}}>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="90">90</option>
            <option value="120">120</option>
          </select>
        </div>
        <div>
          夜の時間
          <select id="nightTime" required value={nightTime} onChange={(event) => {setNightTime(event.target.value)}}>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="90">90</option>
            <option value="120">120</option>
          </select>
        </div>
        <div>
          遺言時間
          <select id="willTime" required value={willTime} onChange={(event) => {setWillTime(event.target.value)}}>
            <option value="0">0</option>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="90">90</option>
            <option value="120">120</option>
          </select>
        </div>
        <div>
          同数投票
          <select id="tieVoteOption" required value={tieVoteOption} onChange={(event) => {setTieVoteOption(event.target.value)}}>
              <option value="0" selected>ランダム処刑</option>
              <option value="1">誰も処刑されない</option>
          </select>
        </div>
        <div>
          人狼チャット
          <select id="werewolfChatSwitch" required value={werewolfChatSwitch} onChange={(event) => {setWerewolfChatSwitch(event.target.value)}}>
              <option value="" hidden disabled></option>
              <option value="0">常に使えない</option>
              <option value="1">夜だけ使える</option>
              <option value="2">常に使える</option>
          </select>
        </div>
        <div>
          初日占い
          <select id="firstNightSee" required value={firstNightSee} onChange={(event) => {setFirstNightSee(event.target.value)}}>
              <option value="0">初日占いあり</option>
              <option value="1">初日占いなし</option>
              <option value="2">初日にランダム占い</option>
          </select>
        </div>
        <div>
        欠けてる役職占い
          <select id="canSeeMissingPosition" required value={canSeeMissingPosition} onChange={(event) => {setCanSeeMissingPosition(event.target.value)}}>
              <option value="true">欠けてる役職を占える</option>
              <option value="false">欠けてる役職を占えない</option>
          </select>
        </div>
        <div>
          投票先の表示
          <select id="isSecretBallot" required value={isSecretBallot} onChange={(event) => {setIsSecretBallot(event.target.value)}}>
              <option value="true">投票先を表示しない</option>
              <option value="false">投票先を表示する</option>
          </select>
        </div>
        <div>
          連続ガード
          <select id="canContinuousGuard" required value={canContinuousGuard} onChange={(event) => {setCanContinuousGuard(event.target.value)}}>
              <option value="true">連続ガードあり</option>
              <option value="false">連続ガードなし</option>
          </select>
        </div>
        <div>怪盗が盗むプレイヤーの指定
          <select id="isRandomStealing" required value={isRandomStealing} onChange={(event) => {setIsRandomStealing(event.target.value)}}>
              <option value="true">ランダムで盗む</option>
              <option value="false">選んで盗む</option>
          </select>
        </div>
        <div>
          ワンナイト人狼
          <select id="isOneNight" required value={isOneNight} onChange={(event) => {setIsOneNight(event.target.value)}}>
              <option value="false">ワンナイト人狼OFF</option>
              <option value="true">ワンナイト人狼ON</option>
          </select>
        </div>
      </div>
      
      <div className="right-area">
        <div className="Buttons">
          <button className="box2" onClick ={setBeginnerSettings} type="button">初心者向け</button>
          <button className="box2" onClick ={setBeginnerSettings} type="button">中級者向け</button>
        </div>
        <div className="Buttons">
          <button className="box2" onClick ={setBeginnerSettings} type="button">上級者向け</button>
          <button className="box2" onClick ={setBeginnerSettings} type="button">ワンナイト</button>
        </div>
        <br/>
        <input onClick={hundleClick} type="button" value="決定" />
      </div>
    </div>
    </Modal>
    </div>
  );
}

ReactDOM.render(
  <GameSet />,
  document.getElementById('root')
);