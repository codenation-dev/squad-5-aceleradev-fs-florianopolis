const BASE_URL = "http://localhost:8080";

export const post = async (uri, body) => {
  const response = await fetch(`${BASE_URL}${uri}`, {
    method: "POST",
    body: JSON.stringify(body)
  });
  return response.json();
};

export const get = async uri => {
  const response = await fetch(`${BASE_URL}${uri}`, {
    method: "GET",
    headers: { Authorization: localStorage.getItem("token") }
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
