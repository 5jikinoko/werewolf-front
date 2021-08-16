/*
参加者のアイコンとプレイヤーネームと生死を表示
工藤
*/
import ReactDOM from 'react-dom';
import './index.css';
//import React from 'react';
import React, { Component, useEffect, useRef, useState, Fragment} from "react";

export default function UsersStatus(props) {
    
    return (
        <div className="scroll-area">
        <div style={{display:"block"}} >
        {props.users.map(user => (
            <div key={user.name} className="user-info">
                <div className="chat-contents-left">
                    <img src={'http://160.16.141.77:51000/' + user.icon + '.png'} className="user-icon"/>
                </div>
                <div className="chat-contents-right">
                    <div className="user-name">
                        {user.name}
                    </div>
                    <div className="chat-text">
                        {user.alive ? <div style={{color: 'green', fontSize:"25px"}}>生存</div> : <div style={{color: 'red', fontSize:"25px"}}>死亡</div>}
                    </div>
                </div>
            </div>
        ))}
        </div>
        </div>
    )
}