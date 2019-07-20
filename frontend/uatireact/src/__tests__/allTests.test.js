import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga"; // SAGA
import rootReducers from "../redux/rootReducer";
import rootSagas from "../redux/rootSagas";

import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "../App";
import Layout from "../pages/Layout";
import { post } from "../utils/api";

configure({ adapter: new Adapter() });

jest.mock("../utils/api", () => ({
  post: jest.fn(async () => [])
}));

describe("Login testing", () => {
  beforeEach(() => {
    post.mockReset();
  });

  test("Login test with mock api", done => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSagas);

    post.mockImplementation(payload => {
      if (
        payload.credentials.username === "1" &&
        payload.credentials.password === "1"
      ) {
        return Promise.resolve({ token: "Token via Mockup" });
      } else {
        return Promise.resolve({ message: "Falha via Mockup" });
      }
    });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Layout>
            <App />
          </Layout>
        </MemoryRouter>
      </Provider>
    );

    setImmediate(async () => {
      try {
        wrapper.update();
        wrapper
          .find('input[name="username"]')
          .simulate("change", { target: { value: "wrong" } });
        wrapper
          .find('input[name="password"]')
          .simulate("change", { target: { value: "credential" } });
        wrapper.find("form").simulate("submit");
        expect(post).toHaveBeenCalled();

        //multiple updates to make sure to await the page to reload before checking Dashboard
        //find some way to make it better (valuable info here https://github.com/airbnb/enzyme/issues/1587)
        await wrapper.update();
        await wrapper.update();
        await wrapper.update();
        await wrapper.update();

        expect(wrapper.exists("Dashboard")).toEqual(false);

        done();
      } catch (err) {
        fail(err);
        done();
      }
    });
  });

  test("Failed login with wrong credentials", done => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSagas);

    post.mockImplementation(payload => {
      if (
        payload.credentials.username === "1" &&
        payload.credentials.password === "1"
      ) {
        return Promise.resolve({ token: "tokenzão" });
      } else {
        return Promise.resolve({ message: "Falha genérica do mock" });
      }
    });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Layout>
            <App />
          </Layout>
        </MemoryRouter>
      </Provider>
    );

    setImmediate(async () => {
      try {
        wrapper.update();
        wrapper
          .find('input[name="username"]')
          .simulate("change", { target: { value: "wrong" } });
        wrapper
          .find('input[name="password"]')
          .simulate("change", { target: { value: "credential" } });
        wrapper.find("form").simulate("submit");
        await wrapper.update();
        await wrapper.update();
        await wrapper.update();
        await wrapper.update();
        expect(wrapper.exists("Dashboard")).toEqual(false);
        done();
      } catch (err) {
        fail(err);
        done();
      }
    });
  });

  test("Login succeed", done => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSagas);

    post.mockImplementation(payload => {
      if (
        payload.credentials.username === "1" &&
        payload.credentials.password === "1"
      ) {
        return Promise.resolve({ token: "tokenzão" });
      } else {
        return Promise.resolve({ message: "Falha genérica do mock" });
      }
    });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Layout>
            <App />
          </Layout>
        </MemoryRouter>
      </Provider>
    );

    setImmediate(async () => {
      try {
        wrapper.update();
        wrapper
          .find('input[name="username"]')
          .simulate("change", { target: { value: "1" } });
        wrapper
          .find('input[name="password"]')
          .simulate("change", { target: { value: "1" } });
        wrapper.find("form").simulate("submit");

        await wrapper.update();
        await wrapper.update();
        await wrapper.update();
        await wrapper.update();
        await wrapper.update();
        //console.log(wrapper.debug());
        expect(wrapper.exists("Dashboard")).toEqual(true);

        done();
      } catch (err) {
        fail(err);
        done();
      }
    });
  });
});
