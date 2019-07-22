import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga"; // SAGA
import rootReducers from "../../redux/rootReducer";
import rootSagas from "../../redux/rootSagas";

import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ImportPage from ".";
import Layout from "../Layout";
import { upload } from "../../utils/api";

configure({ adapter: new Adapter() });

jest.mock("../../utils/api", () => ({
  upload: jest.fn(() => {
    return { response: "not sure what to do with this" };
  })
}));

describe("ImportPage", () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSagas);

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Layout>
          <ImportPage />
        </Layout>
      </MemoryRouter>
    </Provider>
  );

  it("uploads file with mock post", done => {
    wrapper.update();
    wrapper.find('input[name="file"]').simulate("change", {
      target: {
        files: ["dummyValue.something"]
      }
    });
    wrapper.find("form").simulate("submit");
    expect(upload).toHaveBeenCalled();
    expect(upload).toHaveReturnedWith(
      expect.objectContaining({
        response: expect.any(String)
      })
    );
    done();
  });
});
