import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import NoteList from "./NoteList";

describe("Test note list content", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should render a list of note cards", () => {
    const notes = [
      {
        id: 1,
        title: "Self-read",
        content:
          "Deep dive the first session, execute demo codes and check for expected output",
        status: "completed",
      },
      {
        id: 2,
        title: "Assessment: Quiz",
        content: "Activity to be completed to increase confidence",
        status: "completed",
      },
    ];
    render(<NoteList notes={notes} />);
    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(2);
    const firstCard = cards[0];
    const firstTitle = screen.getByText(/self-read/i);
    const firstContent = screen.getByText(
      /Deep dive the first session, execute demo codes and check for expected output/i
    );

    expect(firstCard).toContainElement(firstTitle);
    expect(firstCard).toContainElement(firstContent);
  });
});
