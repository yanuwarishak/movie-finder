import React from "react";
import { render, fireEvent } from "@testing-library/react";

import App from "./App"
it("renders correctly", () => {
  const { queryByTestId, queryByPlaceholderText } = render(<App />)

  expect(queryByPlaceholderText("Enter a Movie Title...")).toBeTruthy()
  expect(queryByTestId("search-button")).toBeTruthy()
})

describe("Search value", () => {
  it("updates on change", () => {
    const { queryByPlaceholderText } = render(<App />)

    const searchInput = queryByPlaceholderText("Enter a Movie Title...")
    fireEvent.change(searchInput, { target: { value: "test" } })
    expect(searchInput.value).toBe("test")
  })
})