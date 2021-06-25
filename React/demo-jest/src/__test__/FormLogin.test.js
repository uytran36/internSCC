import React from "react";
import "./matchMedia.mock";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FormLogin from "../session/FormLogin";
import { StaticRouter } from "react-router-dom";
import { Form, Input, Button } from "antd";

Enzyme.configure({ adapter: new Adapter() });

describe("Form login component", () => {
  it("should render form", () => {
    const wrapper = shallow(<FormLogin />);
    const form = wrapper.find(".form-login");
    expect(form.hasClass("login-form-button"));
  });
});

describe("Password min 6 chars", () => {
  it("should have min 6 chars", () => {
    const wrapper = mount(
      <StaticRouter>
        <Form></Form>
      </StaticRouter>
    );

    let password = wrapper.find("input#normal_login_password");

    password.simulate("change", {
      target: { value: "12345" },
    });
    password = wrapper.find("input#normal_login_password");
    expect(password.props().value).toEqual("12345");
  });
});

describe("Password max 20 chars", () => {
  it("should have max 20 chars", () => {
    const wrapper = mount(
      <StaticRouter>
        <FormLogin></FormLogin>
      </StaticRouter>
    );

    let password = wrapper.find("input#normal_login_password");

    password.simulate("change", {
      target: { value: "1234512312312123123131231231231231" },
    });
    password = wrapper.find("input#normal_login_password");
    expect(password.props().value).toEqual(
      "1234512312312123123131231231231231"
    );
  });
});