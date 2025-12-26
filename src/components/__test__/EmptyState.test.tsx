import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EmptyState } from "@components";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe("EmptyState component", () => {
  it("renders default title and description", () => {
    render(<EmptyState />);

    expect(screen.getByText("Movie not found")).toBeInTheDocument();
    expect(
      screen.getByText("Try using a different keyword")
    ).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <EmptyState title="No results" description="Please try again later" />
    );

    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.getByText("Please try again later")).toBeInTheDocument();
  });

  it("does not render description when description is empty", () => {
    render(<EmptyState description="" />);

    expect(
      screen.queryByText("Try using a different keyword")
    ).not.toBeInTheDocument();
  });

  it("renders image with correct src and alt", () => {
    render(<EmptyState imageSrc="/custom.png" />);

    const image = screen.getByAltText("Empty state");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/custom.png");
  });

  it("uses default image when imageSrc is not provided", () => {
    render(<EmptyState />);

    const image = screen.getByAltText("Empty state");

    expect(image).toHaveAttribute("src", "/not-found.png");
  });
});
