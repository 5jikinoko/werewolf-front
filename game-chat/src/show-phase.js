/*
現在の日付とフェーズ、次のフェーズまでの時間を表示する
工藤
*/
import ReactDOM from 'react-dom';
import './index.css';
//import React from 'react';
import React, { Component, useEffect, useRef, useState, Fragment} from "react";

export default function ShowPhase (props) {
    const [time, setTime] = useState(()=>{
        const now = new Date();
        const next = new Date(props.nextPhaseTime);
        console.log(now.toUTCString);
        console.log(next.toUTCString);
        const time = parseInt( (next - now) / 1000 );
        console.log("フェーズ:" + props.nowPhase + " 次のフェーズまで" + time);
        return time;
    });

    useEffect(() => {
        const id = setInterval(() => {
            setTime(parseInt((props.nextPhaseTime - new Date()) / 1000 ));
        }, 1000);
        return () => clearInterval(id);
    }, [props.nextPhaseTime]);

    const phase = () => {
        const phase = props.nowPhase;
        if (phase === 1 || phase === 5) {
            return "夜";
        } else if (phase === 2) {
            return "朝"
        } else if (phase === 3) {
            return "投票"
        } else if (phase === 4) {
            return "処刑前"
        } else {
            return "ゲーム開始前"
        }
    };

    const start = () => {
        fetch("http://160.16.141.77:51000/game-start",{
            method: "PUT"
        })
        .then(response => {
            const status = response.status;
            if (status === 200) {

            } else if (status === 474) {
                alert("部屋主でないとゲームを開始できません");
            } else if (status === 475) {
                alert("ゲームの設定が済んでいません。ゲームの設定をしてください");
            } else if(status === 476) {
                alert("2日目朝の時点でゲーム終了の可能性があります。ゲームの設定を変更してください")
            } else if (status === 497) {
                alert("UUIDが存在しない");
            } else if (status === 498) {
                alert("部屋が存在しない");
            } else {
                alert("その他エラー" + status);
            }
        })
    }

    const startButton = () => {
        return (
            <div style={{display: "flex"}}>
                <div>"ゲーム開始前"</div>
                <button type="button" onClick={() => start()}>開始</button>
            </div>
        )
    }
 
    return (
        <div className="phase">
            { (props.nowPhase === 0) ? 
            startButton()
            : props.day + "日目" + phase() + " 次のフェーズまで" + time +"秒"}
        </div>
    )

}