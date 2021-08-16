/*
メニュー画面のモーダル。開くと、部屋の情報と、この部屋に参加するためのW4部屋の参加決定・あいことば入力画面のURL（招待リンク）と、W5ゲームの設定画面を開くボタンと、W1プロフィール編集画面を開くボタンと、部屋を解散するボタンを表示する
工藤
 */
import React, { useEffect } from "react";
import Modal, { setAppElement } from "react-modal";
import ProfileModal from "./Profile-modal";
import GameSet from "./set-game";

Modal.setAppElement("#root");


const modalStyle = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.85)"
    },
    content: {
        position: "absolute",
        top: "calc(50% - 300px)",
        left: "calc(50% - 300px)",
        right: "calc(50% - 300px)",
        bottom: "calc(50% - 350px)",
        backgroundColor: "paleturquoise",
        borderRadius: "1rem",
    }
};

export default function MenuModal(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [roomInfo, setRoomInfo] = React.useState(null);

    useEffect(() => {
        //enter-room
        getRoomInfo();
    },[]);


    const getRoomInfo = () => {
        fetch("http://160.16.141.77:51000/room-info?roomID=0", {
            method: "GET",
        })
        .then(response => response.json()) 
        .then(json => {
            console.log(json);
            console.log(json);
            setRoomInfo(json);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const closeRoom = () => {
        const consent = window.confirm("本当に部屋を解散しますか?");
        if (!consent) {
            return;
        }
        fetch("http://160.16.141.77:51000/close-room", {
            method: "POST",
        })
        .then((response) => {
            const status = response.status;
            if (status === 465) {
                alert("UUIDがありません");
            } else if (status === 498) {
                alert("部屋が既に存在しません")
            } else if(status === 497) {
                alert("部屋主でないと部屋を解散できません");
            } else if (status === 200) {

            } else {
                alert("その他エラー");
            }
        });
    }

    return(
        <div className="menu">
            <div onClick={() => {getRoomInfo(); setIsOpen(true);}}>
                <img src={'http://160.16.141.77:51000/menu.png'}/>
            </div>
            {roomInfo !== null ?
            <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} style={modalStyle}>
                <p>{roomInfo.roomName}　部屋主：{roomInfo.hostName}</p>
                <p>参加人数　{roomInfo.nowMember}/{roomInfo.maxMember}</p>
                <p>招待リンク：{"http://160.16.141.77:51000/enter-room?roomID=" + roomInfo.roomID}</p>

                <ProfileModal roomID={roomInfo.roomID} />
                <GameSet roleBreakdown={props.roleBreakdown} gameSettings={props.gameSettings} setSettings={props.setSettings}/>
                <br/>
                <button type="button" class="btn btn-danger" onClick={() => closeRoom()}>部屋を解散</button>
            </Modal>
            : "データの読み込みに失敗しました"}
        </div>
    );
}