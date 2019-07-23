// import axios from "axios";

const BASE_URL =
  "http://ec2-18-223-122-18.us-east-2.compute.amazonaws.com:8080/api/";

export const get = async (uri = "") => {
  const response = await fetch(BASE_URL + uri, {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + localStorage.getItem("userToken")
    })
  });
  return await response.json();
};

export const post = async (uri = "", obj) => {
  const response = await fetch(BASE_URL + uri, {
    method: "POST",
    body: obj
  });
  return await response.json();
};
