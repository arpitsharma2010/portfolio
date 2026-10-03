import { fireEvent, render, screen } from "@testing-library/react";
import { MinecraftToastProvider } from "../MinecraftToast";
import { useMinecraftToast } from "../MinecraftToastContext";

const ToastTrigger = () => {
  const { showToast } = useMinecraftToast();
  return (
    <button type="button" onClick={() => showToast({
      title: "Advancement Made!",
      message: "Opened Skills Inventory",
      icon: "enchanted-book",
    })}>
      Show advancement
    </button>
  );
};

describe("MinecraftToast", () => {
  it("announces the active queued message", () => {
    render(<MinecraftToastProvider><ToastTrigger /></MinecraftToastProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Show advancement" }));

    const announcement = screen.getByRole("status");
    expect(announcement).toHaveAttribute("aria-live", "polite");
    expect(announcement).toHaveTextContent("Advancement Made!");
    expect(announcement).toHaveTextContent("Opened Skills Inventory");
  });
});
