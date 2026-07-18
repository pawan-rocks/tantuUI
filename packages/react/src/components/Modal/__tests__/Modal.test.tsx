import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Modal, ModalHeader, ModalFooter } from "../Modal";

describe("Modal", () => {
  it("does not render when isOpen is false", () => {
    render(<Modal testId="modal">Content</Modal>);
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    render(<Modal isOpen testId="modal">Content</Modal>);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders with role=dialog and aria-modal", () => {
    render(<Modal isOpen testId="modal">Content</Modal>);
    const modal = screen.getByTestId("modal");
    expect(modal).toHaveAttribute("role", "dialog");
    expect(modal).toHaveAttribute("aria-modal", "true");
  });

  it("applies placement class", () => {
    render(<Modal isOpen placement="left" testId="modal">Content</Modal>);
    expect(screen.getByTestId("modal")).toHaveClass("tui-modal--left");
  });

  it("applies size class for center placement", () => {
    render(<Modal isOpen placement="center" size="lg" testId="modal">Content</Modal>);
    expect(screen.getByTestId("modal")).toHaveClass("tui-modal--lg");
  });

  it("does not apply size class for non-center placements", () => {
    render(<Modal isOpen placement="right" size="lg" testId="modal">Content</Modal>);
    expect(screen.getByTestId("modal")).not.toHaveClass("tui-modal--lg");
  });

  it("merges custom className", () => {
    render(<Modal isOpen className="custom-modal" testId="modal">Content</Modal>);
    const modal = screen.getByTestId("modal");
    expect(modal).toHaveClass("tui-modal");
    expect(modal).toHaveClass("custom-modal");
  });

  it("applies custom width via style", () => {
    render(<Modal isOpen width="600px" testId="modal">Content</Modal>);
    expect(screen.getByTestId("modal").style.width).toBe("600px");
  });

  it("applies custom height via style", () => {
    render(<Modal isOpen height="400px" testId="modal">Content</Modal>);
    expect(screen.getByTestId("modal").style.height).toBe("400px");
  });

  it("applies custom maxWidth and maxHeight", () => {
    render(<Modal isOpen maxWidth="800px" maxHeight="90vh" testId="modal">Content</Modal>);
    const modal = screen.getByTestId("modal");
    expect(modal.style.maxWidth).toBe("800px");
    expect(modal.style.maxHeight).toBe("90vh");
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose}>Content</Modal>);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on Escape when closeOnEscape is false", () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} closeOnEscape={false}>Content</Modal>);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} testId="modal">Content</Modal>);
    // Click on the overlay (parent of the modal panel)
    const overlay = screen.getByTestId("modal").parentElement!;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on backdrop click when closeOnBackdropClick is false", () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} closeOnBackdropClick={false} testId="modal">Content</Modal>);
    const overlay = screen.getByTestId("modal").parentElement!;
    fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose when clicking inside modal panel", () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} testId="modal">Content</Modal>);
    fireEvent.click(screen.getByText("Content"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("renders header when provided", () => {
    render(
      <Modal isOpen header={<ModalHeader title="My Title" testId="header" />} testId="modal">
        Content
      </Modal>,
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <Modal isOpen footer={<ModalFooter testId="footer"><button>Save</button></ModalFooter>} testId="modal">
        Content
      </Modal>,
    );
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("applies animated class when animated is true (default)", () => {
    render(<Modal isOpen testId="modal">Content</Modal>);
    expect(screen.getByTestId("modal")).toHaveClass("tui-modal--animated");
  });

  it("does not apply animated class when animated is false", () => {
    render(<Modal isOpen animated={false} testId="modal">Content</Modal>);
    expect(screen.getByTestId("modal")).not.toHaveClass("tui-modal--animated");
  });

  it("renders fullscreen placement", () => {
    render(<Modal isOpen placement="fullscreen" testId="modal">Content</Modal>);
    expect(screen.getByTestId("modal")).toHaveClass("tui-modal--fullscreen");
  });

  it("applies inline style", () => {
    render(<Modal isOpen style={{ border: "2px solid red" }} testId="modal">Content</Modal>);
    expect(screen.getByTestId("modal").style.border).toBe("2px solid red");
  });

  it("spreads additional HTML attributes", () => {
    render(<Modal isOpen data-custom="test" testId="modal">Content</Modal>);
    expect(screen.getByTestId("modal")).toHaveAttribute("data-custom", "test");
  });
});

describe("ModalHeader", () => {
  it("renders title and subtitle", () => {
    render(<ModalHeader title="Title" subtitle="Subtitle" testId="header" />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });

  it("renders close icon by default", () => {
    render(<Modal isOpen testId="modal"><p>Content</p></Modal>);
    expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
  });

  it("hides close icon when showCloseIcon is false", () => {
    render(<Modal isOpen showCloseIcon={false} testId="modal"><p>Content</p></Modal>);
    expect(screen.queryByLabelText("Close modal")).not.toBeInTheDocument();
  });

  it("calls onClose when close icon is clicked", () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} testId="modal"><p>Content</p></Modal>);
    fireEvent.click(screen.getByLabelText("Close modal"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders custom close icon", () => {
    render(<Modal isOpen closeIcon={<span data-testid="custom-icon">X</span>} testId="modal"><p>Content</p></Modal>);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders leftSection", () => {
    render(<ModalHeader leftSection={<span data-testid="left">L</span>} testId="header" />);
    expect(screen.getByTestId("left")).toBeInTheDocument();
  });

  it("renders title/subtitle when no leftSection is provided", () => {
    render(<ModalHeader title="My Title" subtitle="My Sub" testId="header" />);
    expect(screen.getByText("My Title")).toBeInTheDocument();
    expect(screen.getByText("My Sub")).toBeInTheDocument();
  });

  it("renders rightSection", () => {
    render(<ModalHeader rightSection={<span data-testid="right">R</span>} testId="header" />);
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });

  it("renders centerSection (overrides title/subtitle)", () => {
    render(
      <ModalHeader
        title="Title"
        subtitle="Sub"
        centerSection={<span data-testid="center">Custom Center</span>}
        testId="header"
      />,
    );
    expect(screen.getByTestId("center")).toBeInTheDocument();
  });

  it("does not render title/subtitle when leftSection is provided", () => {
    render(
      <ModalHeader
        title="Title"
        subtitle="Sub"
        leftSection={<span data-testid="left">Custom Left</span>}
        testId="header"
      />,
    );
    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Sub")).not.toBeInTheDocument();
  });

  it("renders children inside center section", () => {
    render(<ModalHeader testId="header"><span>Extra</span></ModalHeader>);
    expect(screen.getByText("Extra")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<ModalHeader className="my-header" testId="header" />);
    const header = screen.getByTestId("header");
    expect(header).toHaveClass("tui-modal__header");
    expect(header).toHaveClass("my-header");
  });
});

describe("ModalFooter", () => {
  it("renders children", () => {
    render(<ModalFooter testId="footer"><button>OK</button></ModalFooter>);
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("applies tui-modal__footer class", () => {
    render(<ModalFooter testId="footer">Content</ModalFooter>);
    expect(screen.getByTestId("footer")).toHaveClass("tui-modal__footer");
  });

  it("merges custom className", () => {
    render(<ModalFooter className="my-footer" testId="footer">X</ModalFooter>);
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveClass("tui-modal__footer");
    expect(footer).toHaveClass("my-footer");
  });

  it("renders shimmer when isGhost is true", () => {
    render(<ModalFooter isGhost testId="footer" />);
    const footer = screen.getByTestId("footer");
    expect(footer.querySelector(".tui-shimmer")).toBeInTheDocument();
  });
});

describe("Modal ghost mode", () => {
  it("renders modal structure with shimmer content when isGhost is true", () => {
    render(<Modal isOpen isGhost testId="modal">Content</Modal>);
    const modal = screen.getByTestId("modal");
    expect(modal).toHaveClass("tui-modal");
    expect(modal).toHaveAttribute("role", "dialog");
    // Body should contain shimmer elements
    expect(modal.querySelectorAll(".tui-shimmer").length).toBeGreaterThan(0);
  });

  it("shows close icon on ghost modal", () => {
    render(<Modal isOpen isGhost testId="modal">Content</Modal>);
    expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
  });

  it("calls onClose when close icon is clicked on ghost modal", () => {
    const onClose = vi.fn();
    render(<Modal isOpen isGhost onClose={onClose} testId="modal">Content</Modal>);
    fireEvent.click(screen.getByLabelText("Close modal"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("hides close icon on ghost modal when showCloseIcon is false", () => {
    render(<Modal isOpen isGhost showCloseIcon={false} testId="modal">Content</Modal>);
    expect(screen.queryByLabelText("Close modal")).not.toBeInTheDocument();
  });

  it("renders ghost header when ModalHeader isGhost is true", () => {
    render(
      <Modal isOpen header={<ModalHeader isGhost testId="header" />} testId="modal">
        Content
      </Modal>,
    );
    const header = screen.getByTestId("header");
    expect(header).toHaveClass("tui-modal__header");
    // No title/subtitle → full-width shimmer
    expect(header.querySelector(".tui-shimmer")).toBeInTheDocument();
  });

  it("renders ghost footer when ModalFooter isGhost is true", () => {
    render(
      <Modal isOpen footer={<ModalFooter isGhost testId="footer" />} testId="modal">
        Content
      </Modal>,
    );
    const footer = screen.getByTestId("footer");
    expect(footer.querySelector(".tui-shimmer")).toBeInTheDocument();
  });
});
