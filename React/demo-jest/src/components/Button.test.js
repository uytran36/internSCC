import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Button></Button>, div);
});

it("render button correctly", () => {
  const { getByTestId } = render(<Button label="Click me"></Button>);
  expect(getByTestId("button")).toHaveTextContent("Click me");
});
