export const isServerUp = async () => {
  try {
    await fetch("http://localhost:8080/", {
      method: "GET"
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
