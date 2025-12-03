import "@testing-library/jest-dom";
import React from "react";

jest.mock("react-router-dom", () => {
    const React = require("react");
    const RouterContext = React.createContext({ pathname: "/portfolio/" });

  const Link = ({ to, children, ...rest }: { to: string; children: React.ReactNode }) =>
    React.createElement("a", { href: to, ...rest }, children);

  const MemoryRouter = ({
    initialEntries = ["/portfolio/"],
    children,
  }: {
    initialEntries?: string[];
    children: React.ReactNode;
  }) =>
    React.createElement(
      RouterContext.Provider,
      { value: { pathname: initialEntries[0] } },
      children,
    );

  const useLocation = () => React.useContext(RouterContext);

  return {
    Link,
    NavLink: Link,
    MemoryRouter,
    BrowserRouter: ({ children }: { children: React.ReactNode }) =>
      React.createElement(RouterContext.Provider, { value: { pathname: "/portfolio/" } }, children),
    Routes: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    Route: ({ element }: { element: React.ReactNode }) => React.createElement(React.Fragment, null, element),
    useLocation,
  };
}, { virtual: true });
