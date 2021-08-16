/*
プロフィール編集をする
工藤
*/
import React, { useEffect } from "react";
import Modal, { setAppElement } from "react-modal";

Modal.setAppElement("#root");

//cookieから引数の値を得る
const getCookie = (key) => {
    let result = null;
    const plainCookie = document.cookie;
    if(plainCookie !== "") {
        let allCookies = plainCookie.split("; ");
        for (let i = 0; i < allCookies.length; ++i) {
            const cookie = allCookies[i].split("=");
            if (cookie[0] === key) {
                result = decodeURIComponent( cookie[1]);
                break;
            }
        }
    }
    return result;
}


const modalStyle = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.85)"
    },
    content: {
        position: "absolute",
        top: "calc(50% - 250px)",
        left: "calc(50% - 250px)",
        right: "calc(50% - 250px)",
        bottom: "calc(50% - 150px)",
        backgroundColor: "paleturquoise",
        borderRadius: "1rem",
    }
};



const IconSelectModal = (props) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [iconList, setIconList] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    

    const handleButton = (i) => {
        console.log(i);
        setIsOpen(false);
        props.onClick(i);
    };

    /*
    const icons = () => {
        const result = [];
        for (let i = 1; i <= 20; ++i) {
            result.push(
                <div key={i}>
                    <img src={'http://160.16.141.77:51000/' + i + '.png'} style={{width:"85px"}} onClick={() => handleButton(i)}/>
                </div>
            );
        }
        return result;
    };
    */

    return (
        <div className="icon-select-modal">
            <div onClick={() => setIsOpen(true)}>
                <img src={'http://160.16.141.77:51000/' + props.nowIcon + '.png'} style={{width:"170px"}}/>
            </div>
            <Modal isOpen={modalIsOpen} style={modalStyle}>
                <div style={{
                    display: "inline-flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    }} >

                    {iconList.map((i) => {
                        return(
                            <div key={i}>
                                <img src={'http://160.16.141.77:51000/' + i + '.png'} style={{width:"85px"}} onClick={() => handleButton(i)}/>
                            </div>
                        )
                    })}
                </div>
            </Modal>
        </div>
    );
}

export default function ProfileModal() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [userName, setUserName] = React.useState(getCookie("userName"));
    const [icon, setIcon] = React.useState(() => {
        const nowIcon = getCookie("icon")
        if (nowIcon === null) {
            return 30;
        }
        return parseInt(nowIcon);
    });

    const setIconFromCookie = () => {
        const nowIcon = getCookie("icon");
        if (nowIcon === null) {
            return 30;
        }
        return parseInt(nowIcon);
    };

    const selectIcon = (i) => {
        setIcon(i);
    };

    const registerProfile = () => {
        if ( (icon === null || icon === 30) && userName === "") {
            alert("アイコンとプレイヤーネームを選択してください");
            return;
        } else if (icon === null || icon === 30) {
            alert("アイコンを選択してください");
            return;
        } else if (userName === "") {
            alert("プレイヤーネームを入力してください");
            return; 
        } else if (userName.length > 10) {
            alert("プレイヤーネームは10文字までにしてください");
            return;
        }

        const fd = new FormData();
        fd.set("userName", userName);
        fd.set("icon", icon);

        fetch("http://160.16.141.77:51000/profile-register?announce=false&checkDuplicates=0", {
            method: "PUT",
            body: fd
        })
        .then((response) => {
            const status = response.status;
            console.log(response.status);
            console.log(response.headers);
            console.log(response.body);
            console.log("getCookie:" + getCookie("UUID"));
            if (status === 200) {
                //成功
                setIsOpen(false);
            } else if(Math.floor(status/100) === 4) {
                let notification = "";

                const nameCode = Math.floor( (status-400)/10 );
                if (nameCode === 9) {
                    notification = "プレイヤーネーム不正です";
                } else if (nameCode === 8) {
                    notification = "プレイヤーネームが他の参加者と被っています";
                }
                
                const iconCode = status % 10;
                if (iconCode === 9) {
                    notification += "\nアイコンが不正です";
                } else if (iconCode === 8) {
                    notification += "\nアイコンが他の参加者と被っています";
                }

                alert(notification)
            } else {
                alert("その他エラー");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return(
        <div className="profile-modal">
            <div onClick={() => {setIsOpen(true); setIcon(setIconFromCookie())}}>
                   プロフィールを編集する
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} style={modalStyle}>
            <div className="container">
            <div className="col">
                <div className="d-flex align-items-center justify-content-center" style={{padding:"20px"}}>
                アイコンとプレイヤーネームを設定
                </div>
                <div className="row">
                <div className="col align-self-center" style={{width:"250px", paddingLeft:"10%"}}>
                    <div className="d-flex align-items-center justify-content-center">アイコンを選択</div>
                    <div className="d-flex align-items-center justify-content-center">
                        <IconSelectModal nowIcon={icon} onClick={selectIcon}/>
                    </div>
                </div>
                <div className="col align-self-center" style={{width:"500px", paddingRight:"10%"}}>
                    <div className="d-flex align-items-center justify-content-center">プレイヤーネームを入力</div>
                    <div className="d-flex align-items-center justify-content-center">（10文字以内）</div>
                    <form>
                    <input type="text" value={userName} onChange={(event) => setUserName(event.target.value)}
                        className="form-control" placeholder="プレイヤーネーム"></input>
                    </form>
                </div>
                </div>
                <div className="d-flex justify-content-end" style={{paddingTop:"40px", paddingRight:"15%"}}>
                <button className="btn btn-primary" type="button" onClick={() => registerProfile()}>保存</button>
                </div>
            </div>
            </div>
            </Modal>
        </div>
    );
}