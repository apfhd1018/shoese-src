/* eslint-disable */

import React, { useState, useContext, lazy, Suspense } from "react";
import "./App.css";
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from "react-bootstrap";
import data from "./data";
import { Link, Route, Switch, useHistory } from "react-router-dom";
// import Detail from "./Detail";
let Detail = lazy(() => {
  return import("./Detail.js");
});
import axios from "axios";
import Cart from "./Cart";

const inventoryContext = React.createContext();

function App() {
  const [Shoes, setShoes] = useState(data);
  const [Inventory, setInventory] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand
          href="/"
          style={{ marginLeft: "10px", fontWeight: "bold", fontSize: "1.7rem" }}
        >
          SJ's Shoes Shopping
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ml-auto"
            style={{ marginRight: "20px", fontSize: "1.2rem" }}
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Switch는 Route경로가 겹쳐도 하나만 보여주게 하는 기능 */}
      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <div
              style={{
                display: "inline-block",
                textAlign: "center",
                padding: "40px 0",
                width: "40%",
                background: "rgb(53 53 53 / 55%)",
              }}
            >
              <h1 style={{ fontSize: "3.2rem" }}>20% Season OFF</h1>
              <p style={{ marginTop: "20px" }}>
                감각적인 신발 코디, SJ's Shoes Shopping
              </p>
            </div>
          </Jumbotron>

          {/* 부트스트랩 문법: container는 좌우 여백을 잡아줌, row는 사이트를 12개의 칼럼으로 쪼갬
      col-md-4는 4개의 컬럼을 차지하는 div박스로 만든다*/}
          <div className="container">
            <inventoryContext.Provider value={Inventory}>
              <div className="row">
                {/* Shoes 스테이트를 map함수로 뿌려주는데 Card함수를 반복해서 뿌림 */}
                {/* map함수는 2개의 파라미터까지 넣을수있음. 왼쪽은 반복문 돌릴때 하나하나의 데이터(shoes의 데이터)
                오른쪽은 반복문 돌릴때 0, 1, 2 ...의 반복숫자 */}
                {Shoes.map((a, i) => {
                  return <Card Shoes={Shoes[i]} i={i} key={i} />;
                })}
              </div>
            </inventoryContext.Provider>
            <button
              className="btn btn-primary"
              onClick={() => {
                // ajax요청 성공시 then()실행, 실패시 catch()실행
                // ajax를 사용하면 json형태(따옴표있는) 데이터를 오브젝트(따옴표제거)형태로 자동변환해줌
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    console.log(result.data);
                    setShoes([...Shoes, ...result.data]);
                  })
                  .catch(() => {
                    console.log("실패했습니다.");
                  });
              }}
            >
              더보기
            </button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Suspense fallback={<div>로딩중입니다.</div>}>
            <Detail
              Shoes={Shoes}
              Inventory={Inventory}
              setInventory={setInventory}
            />
          </Suspense>
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
    </div>
  );
}

const Card = (props) => {
  const Inventory = useContext(inventoryContext);
  const history = useHistory();

  return (
    <div
      className="col-md-4"
      onClick={() => {
        history.push("/detail/" + props.Shoes.id);
      }}
    >
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
        style={{ cursor: "pointer" }}
      />
      <h4>{props.Shoes.title}</h4>

      <p>
        {props.Shoes.content} & {props.Shoes.price}
      </p>
      <Test />
    </div>
  );
};

const Test = () => {
  const Inventory = useContext(inventoryContext);
  return <p>재고 : {Inventory[0]}</p>;
};

export default App;
