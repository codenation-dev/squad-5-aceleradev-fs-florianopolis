function User(state = { isLogged: false }, action) {
  console.log("== User state is being accessed...");
  switch (action.type) {
    case "TOGGLE_IS_LOGGED":
      return {
        isLogged: !state.isLogged
      };
    default:
      return state;
  }
}

export default User;
