const BASE_URL = "http://localhost:8080/api";

export const post = async (uri, body) => {
  const response = await fetch(`${BASE_URL}${uri}`, {
    method: "POST",
    body: JSON.stringify(body)
  });
  return response.json();
};

export const get = async uri => {
  const response = await fetch(`${BASE_URL}${uri}`, {
    method: "GET"
  });
  console.log(response);
  return response.json();
};

//This autGet gets denied by cors while the above works,
//but it doesn't send the auth token, so it gets denied as well
export const authGet = async uri => {
  const response = await fetch(`${BASE_URL}${uri}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
  });
  console.log(response);
  return response.json();
};

export const upload = async (uri, file) => {
  const response = await fetch(`${BASE_URL}${uri}`, {
    method: "POST",
    headers: { Authorization: localStorage.getItem("token") },
    body: file
  });
  return response.json();
};
