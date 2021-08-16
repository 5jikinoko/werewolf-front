/*
夜のアクションと投票をしてその結果が表示される
工藤
*/
import ReactDOM from 'react-dom';
import './index.css';
//import React from 'react';
import React, { Component, useEffect, useRef, useState, Fragment} from "react";
export default function Action(props) {

    const [targetName, setTargetName] = useState("");
    const [priority, setPriority] = useState(1);

    const doAction = () => {
        if (targetName === "") {
            return;
        }
        const nowPhase = props.nowPhase;
        const fd = new FormData();
        fd.set("targetName", targetName);
        let status;
        if (nowPhase === 3) {
            console.log(targetName + "に投票しました");
            //投票する
            fetch("http://160.16.141.77:51000/vote", {
                method: "POST",
                body: fd
            })
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    props.setCompleteAction(true);
                    console.log("アクション実行成功");
                    setTargetName("");
                } else if (status === 465) {
                    alert("UUIDがありません");
                } else if (status === 498) {
                    alert("部屋が存在しません");
                } else if (status === 499) {
                    alert("入力が不正です");
                } else {
                    alert("doAction:そのエラー:" + status);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        } else if (nowPhase === 1 || nowPhase === 5) {
            //夜のアクションを実行
            console.log(targetName + "に夜のアクションを実行");
            fd.set("priority", priority);
            fetch("http://160.16.141.77:51000/night-action", {
                method: "PUT",
                body: fd
            })
            .then((response) => {
                status = response.status;
                if (status === 200) {
                    props.setCompleteAction(true);
                    console.log("アクション実行成功");
                    setTargetName("");
                } else if (status === 465) {
                    alert("UUIDがありません");
                } else if (status === 498) {
                    alert("部屋が存在しません");
                } else if (status === 499) {
                    alert("入力が不正です");
                } else {
                    alert("doAction:そのエラー:" + status);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            return;
        }
        

    }
    const dropdownList = () => {
        const nowPhase = props.nowPhase;
        if (props.completeAction || nowPhase === 0 || !props.alive) {
            return null;
        }
        console.log("completeAction:" + props.completeAction);
        let prompt = null;
        const myRole = props.myRole;
        const gameSettings = props.gameSettings;
        if (nowPhase === 1) {
            if (myRole === "seer" && gameSettings.firstNightSee === 0) {
                prompt = "占う"
            } else if (myRole === "phantomThief" && !gameSettings.isRandomStealing) {
                prompt = "盗む"
            }
        } if(nowPhase === 5) {
            switch (myRole) {
                case "seer":
                    prompt = "占う";
                    break;
                case "knight":
                    prompt = "護衛する"
                    break;
                case "hunter":
                    prompt = "護衛する"
                    break;
                case "blackKnight":
                    prompt = "護衛する"
                    break;
                case "werewolf":
                    prompt = "襲撃する"
                    break;
            }
        } else if (nowPhase === 3) {
            prompt = "投票する";
        }
        if (prompt === null) {
            return null;
        }
        
        return (
            <div className="action-form">
                <select value={targetName} onChange={(event) => {setTargetName(event.target.value)}}>
                    <option ket={""} value={""}>{"対象を選択"}</option>
                    {props.statusList.map((status) => (
                        status.alive && status.name !== props.myName ? <option ket={status.id} value={status.name}>{status.name}</option> : null
                    ))}
                </select>
                <button type="button" onClick={() => doAction()}>{prompt}</button>
            </div>
        )
    }

    const roleInJapanese = (role) => {
        switch (role) {
            case "villager":
                return "村人";
            case "seer":
                return "占い師";
            case "necromancer":
                return "霊媒師";
            case "knight":
                return "騎士";
            case "hunter":
                return "ハンター";
            case "blackKnight":
                return "黒騎士";
            case "freemasonary":
                return "共有者";
            case "baker":
                return "パン屋";
            case "werewolf":
                return "人狼";
            case "madman":
                return "狂人";
            case "traitor":
                return "背信者";
            case "foxSpirit":
                return "妖狐";
            case "fool":
                return "吊人";
            case "phantomThief":
                return "怪盗";
            default:
                return "";
        }
    }

    //const testData =[{text:"こんにちは"}, {text:"うおおおおお\nお\nお\nお\nお\nお\nお\n\n\nお\nん？"}, {text:"ダメ"}, {text:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}, {text:"あ\na\nb\c\nd\ne\nf\ng\nh\ni\nj\nk"}];

    return (
        <div className="action-area">
            <div className="action-log-container">
                <div className="scroll-area">
                    <div style={{width:"100%", textAlign:"center", fontSize: "30px"}}>{roleInJapanese(props.myRole)}</div>
                    <div style={{width: "100%"}}>
                        {props.actionLog.map( (log, index) => (
                                <div key={index} className="action-log">{log}</div>
                        ))}
                    </div>
            </div>
            </div>
            {dropdownList()}
        </div>
    )
}