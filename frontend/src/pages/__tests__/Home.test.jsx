import { render, screen } from "@testing-library/react";
import Home from "../Home";
import "@testing-library/jest-dom";
import { AuthContext } from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

function MockProviders({ children }) {
  return (
    <AuthContext.Provider value={{ user: null, login: () => {}, logout: () => {} }}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

describe("Home Page", () => {
 test("renders main heading", () => {
  render(
    <MockProviders>
      <Home />
    </MockProviders>
  );

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent(/My Library/i);
});

  test("renders Login and Register buttons", () => {
    render(
      <MockProviders>
        <Home />
      </MockProviders>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("renders feature cards", () => {
    render(
      <MockProviders>
        <Home />
      </MockProviders>
    );
    expect(screen.getByText(/Easy Book Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Secure Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Clean Modern UI/i)).toBeInTheDocument();
  });
});
