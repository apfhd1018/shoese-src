import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import styled from "styled-components";

const Button = styled.button`
  margin-top: 8px;
  border-radius: 5px;
`;

const Cart = (props) => {
  const [Alert, setAlert] = useState(true);

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {props.state.map((a, i) => {
            return (
              <tr key={i}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.quantity}</td>
                <td>
                  {/* 현재 줄이 안바뀌고 id와 같은 숫자를 가진 줄의 상품이 바뀌고있음 */}
                  <button
                    onClick={() => {
                      //데이터 수정요청을 할 땐 props.dispatch()
                      props.dispatch({
                        type: "quanIncrease",
                        data: i,
                      });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      props.dispatch({
                        type: "quanDecrease",
                        data: i,
                      });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {Alert === true ? (
        <div className="my-alert2">
          <p>지금 구매하시면 신규할인 20%</p>
          <Button
            onClick={() => {
              setAlert(false);
            }}
          >
            닫기
          </Button>
        </div>
      ) : null}
    </div>
  );
};

const makeProps = (state) => {
  return {
    state: state,
  };
};

export default connect(makeProps)(Cart);
// export default Cart;
