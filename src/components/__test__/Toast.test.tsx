import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toast } from "@components";

jest.useFakeTimers();

describe("Toast component", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("renders message correctly", () => {
    render(<Toast message="Something went wrong" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("shows toast on mount", () => {
    const { container } = render(<Toast message="Hello" />);

    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.className).toContain("translate-y-0");
    expect(wrapper.className).toContain("opacity-100");
  });

  it("hides toast after duration", () => {
    const { container } = render(<Toast message="Auto hide" duration={3000} />);

    const wrapper = container.firstChild as HTMLElement;

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(wrapper.className).toContain("translate-y-full");
    expect(wrapper.className).toContain("opacity-0");
  });

  it("calls onClose after duration + animation delay", () => {
    const onClose = jest.fn();

    render(
      <Toast message="Close callback" duration={3000} onClose={onClose} />
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("applies error style by default", () => {
    render(<Toast message="Error toast" />);

    const toast = screen.getByText("Error toast");

    expect(toast).toHaveClass("bg-red-600");
  });

  it("applies success style when type is success", () => {
    render(<Toast message="Success toast" type="success" />);

    const toast = screen.getByText("Success toast");

    expect(toast).toHaveClass("bg-green-600");
  });

  it("cleans up timer on unmount", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

    const { unmount } = render(<Toast message="Cleanup test" />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
