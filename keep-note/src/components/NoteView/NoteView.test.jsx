import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import NoteView from "./NoteView";

describe("Test Note View content", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should render title and noteview component", () => {
    const notes = [];
    render(<NoteView notes={notes} />);

    const title = screen.getByRole("heading");
    const noteList = screen.getByRole("list");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      /Checklist Chronicles: Conquering Tasks One Tick at a Time/i
    );
    expect(noteList).toBeInTheDocument();
  });

  test("Should pass notes prop to notelist component", () => {
    const notes = [
      { id: 1, title: "Note-1" },
      { id: 2, title: "Note-2" },
    ];

    render(<NoteView notes={notes} />);
    expect(screen.getByText(/Note-1/i)).toBeInTheDocument();
  });
});
