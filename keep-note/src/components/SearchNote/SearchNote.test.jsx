import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import SearchNote from "./SearchNote";

describe("Test search functionality UI and logic", () => {
  let mockOnSearch, mockOnClearSearch;
  beforeEach(() => {
    mockOnSearch = jest.fn();
    mockOnClearSearch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("Should show clear button when search text is entered", () => {
    render(<SearchNote />);
    const input = screen.getByPlaceholderText("Search Notes");
    fireEvent.change(input, { target: { value: "Self-read" } });
    const clearButton = screen.getByText("X");
    expect(clearButton).toBeInTheDocument();
  });

  test("Should render search input box and hide clear button initially when the text is empty", () => {
    render(<SearchNote searchTextBox="" onSearchNote={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search Notes");
    const clearButton = screen.queryByText("X");
    expect(input).toBeInTheDocument();
    expect(clearButton).not.toBeInTheDocument();
  });

  test("Should simulate input change", () => {
    render(<SearchNote value="Self-read" onSearchNote={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search Notes");
    fireEvent.change(input, {
      target: { value: "Refactor practice exercise" },
    });
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  test("Should simulate clear button click", () => {
    render(
      <SearchNote
        value="Self-read"
        onSearchNote={mockOnSearch}
        onClearNote={mockOnClearSearch}
      />
    );

    const clearButton = screen.queryByText("X");
    fireEvent.click(clearButton);
    expect(mockOnClearSearch).toHaveBeenCalledTimes(1);
  });
});
