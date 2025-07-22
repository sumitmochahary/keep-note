import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import NoteCard from "./NoteCard";

describe("Test note card content", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should render title and content", () => {
    const note = {
      id: 1,
      title: "Self-Read",
      content:
        "Deep dive the first session, execute demo codes and check for expected output",
      status: "completed",
    };

    render(<NoteCard note={note} />);

    const title = screen.getByText(/self-read/i);
    const content = screen.getByText(
      /Deep dive the first session, execute demo codes and check for expected output/i
    );

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
