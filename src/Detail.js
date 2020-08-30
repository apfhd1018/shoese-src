import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

const Box = styled.div`
  padding: 20px;
`;
const Title = styled.h4`
  font-size: 25px;
  color: ${(props) => props.color};
`;
const Button = styled.button`
  margin: 0 5px;
`;
const Others = styled.div`
  text-align: left;
  margin-top: 40px;
`;

const Alert = () => {
  return (
    <div className="my-alert2">
      <p>재고가 얼마 남지 않았습니다.</p>
    </div>
  );
};

const Detail = (props) => {
  const [Hide, setHide] = useState(true);
  const [Tab, setTab] = useState(0);
  const [Switch, setSwitch] = useState(false); // transition 변수

  useEffect(() => {
    // setTimeout은 자바스크립트문법
    const Timer = setTimeout(() => {
      setHide(false);
    }, 2000);
    return () => {
      clearTimeout(Timer);
    };
  }, []);

  let history = useHistory(); // history는 방문기록을 저장해놓는 오브젝트
  let { id } = useParams(); //중괄호에 사용자가 입력한 URL 파라미터들이 들어있음 => id로 저장한거임

  return (
    <div className="container">
      <Box>
        <Title className="black">상세페이지</Title>
      </Box>

      {Hide === true ? <Alert /> : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (props.Shoes[id].id + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.Shoes[id].title}</h4>
          <p>{props.Shoes[id].content}</p>
          <p>{props.Shoes[id].price}</p>

          <Info Inventory={props.Inventory} />

          <Button
            className="btn btn-danger"
            onClick={() => {
              props.setInventory([9, 10, 11]);
              props.dispatch({
                type: "add",
                data: {
                  id: props.Shoes[id].id,
                  name: props.Shoes[id].title,
                  quantity: 1,
                },
              });
              history.push("/cart"); //페이지 이동을 강제로 함
            }}
          >
            주문하기
          </Button>
          {/* goBack함수는 뒤로가기 함수임 */}
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
      {/* eventKey는 부트스트랩 문법, 누를수있는 버튼이 완성됨 */}
      {/* defaultActiveKey는 페이지 방문시 link-0을 누른상태를 불러옴 */}
      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setSwitch(false);
              setTab(0);
            }}
          >
            상세정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setSwitch(false);
              setTab(1);
            }}
          >
            반품/교환정보
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={Switch} classNames="wow" timeout={500}>
        <TabContent Tab={Tab} setSwitch={setSwitch} />
      </CSSTransition>
    </div>
  );
};

const TabContent = (props) => {
  // TabContent가 로드되거나 변경될 때 아래 useEffect를 통해 Switch true로 변경
  useEffect(() => {
    props.setSwitch(true);
  });

  if (props.Tab === 0) {
    return (
      <Others>
        <p>1. 상품상태 : 새상품</p>
        <p>2. 원산지 : 한국</p>
        <p>3. 배송 기간 : 2 ~ 3일</p>
      </Others>
    );
  } else if (props.Tab === 1) {
    return (
      <Others>
        <p>1. 구매자 단순 변심은 상품 수령후 7일 이내</p>
        <p>
          2. 표시/광고와 상이, 상품하자의 경우 상품 수령 후 3개월 이내 혹은
          표시/광고와 다른 사실을 안 날로부터 30일 이내.
          <br /> 둘 중 하나 경과시 반품/교환 불가
        </p>
      </Others>
    );
  }
};

const Info = (props) => {
  return <p>재고 : {props.Inventory[0]}</p>;
};

const makeProps = (state) => {
  console.log(state);
  return {
    state: state,
  };
};

export default connect(makeProps)(Detail);
// export default Detail;
