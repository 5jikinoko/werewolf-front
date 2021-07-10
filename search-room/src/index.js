import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import ProfileModal from "./Profile-modal";

class RoomSearch extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      roomList: {}
    };
  }

  componentDidMount() {
    fetch("http://160.16.141.77:51000/room-list")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            roomList: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  //作成ボタンのクリック時動作
  hundleClickMake() {
    window.location.href = "http://160.16.141.77:51000/make-room";
  }



  render(){
  //L69：表示したい情報を適宜追加
    const error = this.state.error;
    const isLoaded = this.state.isLoaded;
    const roomList = this.state.roomList;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <ProfileModal/>
        <div className="container">
          <div className="center-area">
            <div className="out-flame">
              <button className="roommake" onClick ={() => {this.hundleClickMake()} } type="button">部屋を作る</button>
              <div className="in-flame">
                <div className="stute">
                  部屋一覧
                </div>
                <ul className="UL">              
                  {roomList.map(room => (
                    <li key={room.roomID} className="box3" type="button" onClick = {() => {window.location.href="http://160.16.141.77:51000/enter-room?roomID=" + room.roomID}}>
                      <p>{room.roomName}　部屋主：{room.hostName}</p> 
                      <p>参加者/人数制限：{room.nowMember}/{room.maxMember}</p>
                      <p>あいことば{room.existPass ? "あり" : "なし"}</p>
                      <p>{room.introduction}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
      );
    }
  }
}

ReactDOM.render(
  <RoomSearch />,
  document.getElementById('root')
);
