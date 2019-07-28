const BASE_URL =
  "http://ec2-18-223-122-18.us-east-2.compute.amazonaws.com:8080/api/";

export const get = async (uri = "", auth = false) => {
  const data = {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + localStorage.getItem("userToken")
    })
  }

  !auth && delete data.headers;

  const response = await fetch(BASE_URL + uri, data);
  
  return await uri === "" ? response : response.json();
};

export const post = async (uri = "", obj, auth = false) => {
  let data = "";
  
  data = {
    method: "POST",
    body: obj,
    headers: auth ? new Headers({
      Authorization: "Bearer " + localStorage.getItem("userToken")
    }) : ""
  }

  !auth && delete data.headers;

  const response = await fetch(BASE_URL + uri, data);
  
  return await response.json();
};
