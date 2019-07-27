import styled from "styled-components";

export const Error = styled.div`
  font-size: 12px;
  color: #ff3333;
  width: 100%;
  text-align: left;
`;

export const Status = styled.span`
  display: inline-block;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  margin: 0px 0px -3px 5px;
`;

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  input {
    flex: 1;

    margin-bottom: 15px;
    padding: 12px 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #000;
    font-size: 16px;
    background: #fff;
    border: 1px solid #ddd !important;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
`;
