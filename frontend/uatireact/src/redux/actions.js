export function toggleIsLogged(nameAction) {
  let type = "";

  if (nameAction === "Register") {
    type = "REGISTER_USER";
  } else {
    type = "TOGGLE_IS_LOGGED";
  }

  console.log(type);

  return {
    type: type
  };
}
