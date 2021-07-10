import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import ProfileModal from "./Profile-modal";

//今いるページのURLパラメータを得る
const getParam = (name) => {
    
  if (1 < document.location.search.length) {
      // 最初の1文字 (?記号) を除いた文字列を取得する
      const query = document.location.search.substring(1);

      // クエリの区切り記号 (&) で文字列を配列に分割する
      const parameters = query.split('&');
      for (let i = 0; i < parameters.length; i++) {
          // パラメータ名とパラメータ値に分割する
          const element = parameters[i].split('=');
          const paramName = decodeURIComponent(element[0]);
          console.log(paramName + ":" + element[1]);
          if (paramName === name) {
              return decodeURIComponent(element[1]);
          }
      }
  }
  return null;
}


class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: {},
        pass: ""
      };
    }
    
    componentDidMount(){
      /*
      const roomID = getParam("roomID");
      console.log("roomID=" + roomID);
      let URL
      if (roomID == null) {
        alert("URLが不正です");
        window.location.href = "/search-room"
      } else {
        URL = "http://160.16.141.77:51000/room-info?roomID=" + roomID;
      }
      fetch(URL)
        .then(res => res.json())
        .then((result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )*/
        this.setState({
          isLoaded: true,
          items: {roomID: 1, hostName: "ホストの名前", roomName: "人狼部屋", maxMember: 10, nowMember: 5, existPass: true, introduction:"吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。"}
        });
    }
    
    //参加ボタンクリック時
    hundleClickMake(){
      if (this.state.items.existPass && this.state.pass === "") {
        alert("パスワードを入力して下さい")
        return;
      }
      const roomID = getParam("roomID");
      const fd = new FormData();
      fd.set("roomID", roomID);
      fd.set("pass", this.state.pass);
        fetch("http://160.16.141.77:51000/enter-room", {
            method: "PUT",
            body: fd
        })
        .then((response) => {
            const status = response.status;
            if (status === 200 || status === 201) {
                window.location.href = "/game-chat"
            } else if(status === 401) {
              alert("あいことばが違います");
            } else if (status === 466) {
              alert("プロフィール登録をしてください");
            } else if (status === 497) {
              alert("UUIDが存在しない");
            } else if (status === 498) {
              alert("部屋が存在しません");
            } else if (status === 499) {
              alert("部屋IDが指定されていません");
            } else if (status === 554) {
              alert("既にゲームが始まってしまっています");
              window.location.href = "/search-room";
            } else if (status === 555) {
              alert("定員オーバーです");
            } else {
              alert(status);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    hundleClickBack(){
      window.location.href = "http://160.16.141.77:51000/search-room";
    }
    
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        let inputPsssArea=null;
        if (items.existPass) {
          inputPsssArea = (
            <div class="row g2 justify-content-end align-items-center">
              <div class="col-auto">
                <label class="col-form-label">パスワード</label>
              </div>
              <div class="col-auto">
                <input type="text" class="form-control" aria-describedby="passwordHelpInline"
                value={this.state.pass} onChange={(event) => {this.setState({pass : event.target.value}); console.log("パスワード入力" + event.target.value)}} />
              </div>
          </div>
          )
        }
        return (
          <div className="container-fluid">
            <ProfileModal/>
            <div className="col card mx-2 bg-light">
              <h3 className="mx-3 mt-3">
                {items.roomName}
              </h3>
              <ul className="list-group my-3">
                <li className="list-group-item d-flex lh-sm">
                  <h6>部屋主　：</h6><span>{items.hostName}</span>
                </li>
                <li className="list-group-item d-flex lh-sm">
                  <h6>参加人数：</h6><span>{items.nowMember}/{items.maxMember}</span>
                </li>
                <li className="list-group-item">
                  <h6>紹介文</h6>
                  <div>{items.introduction}</div>
                </li>
              </ul>
              <div className="mx-2">
                  {inputPsssArea}
                  <div className="d-flex justify-content-end mx-2 my-2">
                    <button className="btn btn-secondary mx-2" onClick ={this.hundleClickBack} type="button">戻る</button>
                    <button className="btn btn-primary" onClick={ () => this.hundleClickMake()} type="button">参加</button> 
                  </div>
              </div>
            </div>
            
          </div>
        );
      }
    }
  }
  
  ReactDOM.render(
    <Board />,
    document.getElementById('root')
  );
