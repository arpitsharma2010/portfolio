import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import {
  ACTIONS, CHANNELS, EXTERNAL_REL, EXTERNAL_TARGET, LOCATION_LINE, PROMPT, SECTION_DESCRIPTION, SECTION_EYEBROW, SECTION_TITLE,
} from "./contactContent.fixture";

// Written against the pre-redesign component and kept passing through the redesign.
const expectTarget = (link: HTMLElement, external: boolean) => {
  if (external) {
    expect(link).toHaveAttribute("target", EXTERNAL_TARGET);
    expect(link).toHaveAttribute("rel", EXTERNAL_REL);
  } else {
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  }
};

describe("Contact content lock", () => {
  it("keeps the heading, label, description and prompt", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(SECTION_TITLE);
    expect(screen.getByText(SECTION_EYEBROW)).toBeInTheDocument();
    expect(screen.getByText(SECTION_DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText(PROMPT)).toBeInTheDocument();
  });

  it("keeps every channel's label, value, href and target/rel in the original order", () => {
    const { container } = render(<Contact />);
    const links = [...container.querySelectorAll<HTMLAnchorElement>("li a")];
    expect(links.map((a) => a.getAttribute("href"))).toEqual(CHANNELS.map((c) => c.href));
    CHANNELS.forEach((channel, index) => {
      expect(links[index]).toHaveTextContent(channel.label);
      expect(links[index]).toHaveTextContent(channel.value);
      expectTarget(links[index], channel.external);
    });
  });

  it("keeps the call-to-action labels, hrefs and target/rel", () => {
    render(<Contact />);
    ACTIONS.forEach((action) => {
      const link = screen.getByRole("link", { name: action.label });
      expect(link).toHaveAttribute("href", action.href);
      expectTarget(link, action.external);
    });
  });

  it("keeps the location line and publishes no other contact facts", () => {
    const { container } = render(<Contact />);
    expect(container.textContent!.replace(/\s+/g, " ")).toContain(LOCATION_LINE);
    expect(container.querySelectorAll("a")).toHaveLength(CHANNELS.length + ACTIONS.length);
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
  });
});
