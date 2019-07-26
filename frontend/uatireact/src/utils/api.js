// import axios from "axios";

const BASE_URL =
  "http://ec2-18-223-122-18.us-east-2.compute.amazonaws.com:8080/api/";

export const get = async (uri = "") => {
  const data = {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + localStorage.getItem("userToken")
    })
  }
  const response = await fetch(BASE_URL + uri, data);
  return await response.json();
};

export const post = async (uri = "", obj, auth = false) => {
  let data = "";
  
  if(auth){
    data = {
      method: "POST",
      body: obj,
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("userToken")
      })
    }
  
  }else{
    data = {
      method: "POST",
      body: obj
    }
  }
  
  const response = await fetch(BASE_URL + uri, data);
  return await response.json();
};
