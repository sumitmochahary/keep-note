import { render, screen, cleanup } from "@testing-library/react";
import Footer from "./Footer";

describe("Test Footer content", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should render footer with copyright details", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    const copyrightText = screen.getByText(
      /copyright © 2024 Keep Note\. All rights reserved\./i
    );

    expect(footer).toBeInTheDocument();
    expect(copyrightText).toBeInTheDocument();
  });

  test("Should verify social media URL links", () => {
    render(<Footer />);

    const socailLinks = screen.getAllByRole("link");

    expect(socailLinks[0].href).toBe("https://www.facebook.com/");
    expect(socailLinks[1].href).toBe("https://www.instagram.com/");
    expect(socailLinks[2].href).toBe("https://www.linkedin.com/");
  });

  test("Should check for specific social media icons", () => {
    render(<Footer />);

    expect(screen.getByTestId("facebook-icon")).toBeInTheDocument();
    expect(screen.getByTestId("instagram-icon")).toBeInTheDocument();
    expect(screen.getByTestId("linkedin-icon")).toBeInTheDocument();
  });
});
