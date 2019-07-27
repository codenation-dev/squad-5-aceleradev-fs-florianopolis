import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga"; // SAGA
import rootReducers from "../../redux/rootReducer";
import rootSagas from "../../redux/rootSagas";

import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Dashboard from ".";
import Layout from "../Layout";
import { get } from "../../utils/api";

configure({ adapter: new Adapter() });

jest.mock("../../utils/api", () => ({
  get: jest.fn(() => {
    return { todo: "client list mockup" };
  })
}));

describe("Dashboard", () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSagas);

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Layout>
          <Dashboard />
        </Layout>
      </MemoryRouter>
    </Provider>
  );

  it("receives client list", done => {
    expect(get).toHaveReturned();
    done();
  });
});
