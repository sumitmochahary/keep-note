import { render, screen, cleanup } from "@testing-library/react";
import Header from "./Header";

describe("test header content", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should render the header with children and logo", () => {
    render(
      <Header>
        <p>Test Child</p>
      </Header>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("header-logo")).toBeInTheDocument();
    expect(screen.getByText(/test child/i)).toBeInTheDocument();
  });
});
