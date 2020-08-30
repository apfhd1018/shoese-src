import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

// Redux쓰는 이유 1 : 복잡한 props전송이 필요 없음 2: state데이터 관리 가능함

const initialValue = [];

const reducer = (state = initialValue, action) => {
  //장바구니 추가
  if (action.type === "add") {
    // state 안에 id: action.data 인게 있나?
    //findIndex() : 자바스크립트함수, array안에서 원하는 데이터 찾아주는 함수
    //state 안에 id: action.data 인게 있는지?
    let found = state.findIndex((a) => {
      return a.id === action.data.id;
    });
    //같은상품 주문한 경우 동일상품의 수량을 증가시킴
    if (found >= 0) {
      const copy = [...state];
      copy[found].quantity++;
      return copy;
    } else {
      const copy = [...state];
      copy.push(action.data);
      return copy;
    }
  } else if (action.type === "quanIncrease") {
    // 수량 증가

    const copy = [...state];
    copy[action.data].quantity++;
    return copy;
  } else if (action.type === "quanDecrease") {
    // 수량 감소
    const copy = [...state];
    copy[action.data].quantity--;
    return copy;
  } else return state;
};

const store = createStore(reducer);

// props 공유하고싶은 컴포넌트를 Provider로 감싼다.
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
