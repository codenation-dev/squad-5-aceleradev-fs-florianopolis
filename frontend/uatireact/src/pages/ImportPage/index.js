import React from "react";

const ImportPage = () => {
  return (
    <div>
      <h1>Submit your clients.csv file</h1>
      <form onSubmit={() => {}}>
        <input type="file" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImportPage;
