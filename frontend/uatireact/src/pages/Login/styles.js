import styled from "styled-components";

//   loginBg: {
//     backgroundColor: "#fff",
//     padding: "60px 20px",
//     border: "1px solid #ccc"
//   },
//   ipt: {
//     marginTop: "10px"
//   },
//   link: {
//     textDecoration: "none !important"
//   },
//   btn: {
//     marginTop: "10px",
//     marginRight: "10px"
//   },
//   error: {
//     fontSize: "12px",
//     color: "red",
//     padding: "10px 0px"
//   }

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Error = styled.div`
  font-size: 12px;
  color: #ff3333;
  width: 100%;
  text-align: left;
`;

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
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
