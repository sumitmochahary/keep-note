import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import App from "./App";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
jest.mock("axios");

describe("Test App component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({
      data: [
        { title: "Self-read" },
        { title: "Practice-exercise: HTML" },
        { title: "Assessment: Quiz" },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("Should render the app with header, search box, note list and footer", async () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    );

    const header = screen.getByTestId("header");
    const searchInput = screen.getByPlaceholderText("Search Notes");
    const footer = screen.getByRole("contentinfo");

    expect(header).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:3001/notes");
    });

    await waitFor(() => {
      const noteTitle = screen.getAllByText(
        /Self-read|Practice-exercise: HTML/i
      );
      expect(noteTitle).toHaveLength(2);
    });
  });

  test("Should filter notes based on search text", async () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    );

    await waitFor(() => {
      const noteTitle = screen.getAllByText(/Self-read/i);
      expect(noteTitle).toHaveLength(1);
    });

    const searchInput = screen.getByPlaceholderText("Search Notes");
    fireEvent.change(searchInput, { target: { value: "Self" } });

    await waitFor(() => {
      const filteredOutNote = screen.queryByText(/Practice-exercise: HTML/i);
      expect(filteredOutNote).not.toBeInTheDocument();
    });
  });

  test("Should handle data fetching errors", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>;
  });
});
