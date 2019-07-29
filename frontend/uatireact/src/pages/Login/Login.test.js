import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga"; // SAGA
import rootReducers from "../../redux/rootReducer";
import rootSagas from "../../redux/rootSagas";

import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Login from ".";
import Layout from "../Layout";
import { tryLogin } from "../../services/login";

configure({ adapter: new Adapter() });

jest.mock("../../services/login", () => ({
  tryLogin: jest.fn(credentials => {
    const { email, password } = JSON.parse(credentials);
    if (email === "1" && password === "1") {
      return { token: "Token via mock" };
    } else {
      return { message: "Login error via mockup" };
    }
  })
}));

describe("Login", () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSagas);

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Layout>
          <Login />
        </Layout>
      </MemoryRouter>
    </Provider>
  );

  it("logins successfully with right credentials", done => {
    wrapper.update();
    wrapper
      .find('input[name="email"]')
      .simulate("change", { target: { value: "1" } });
    wrapper
      .find('input[name="password"]')
      .simulate("change", { target: { value: "1" } });
    wrapper.find("form").simulate("submit");
    expect(tryLogin).toHaveReturnedWith(
      expect.objectContaining({
        token: expect.any(String)
      })
    );
    done();
  });

  it("login fails with wrong credentials", done => {
    wrapper.update();
    wrapper
      .find('input[name="email"]')
      .simulate("change", { target: { value: "wrong" } });
    wrapper
      .find('input[name="password"]')
      .simulate("change", { target: { value: "credentials" } });
    wrapper.find("form").simulate("submit");
    expect(tryLogin).toHaveReturnedWith(
      expect.objectContaining({
        message: expect.any(String)
      })
    );
    done();
  });
});
