import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "axios";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);

  expect(getByText(/Add/i)).toBeInTheDocument();
});
