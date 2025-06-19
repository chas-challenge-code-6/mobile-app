import NewsCard from "../components/NewsCard";
import { ThemeProvider } from "../context/ThemeContext";
import { render, expect } from "@testing-library/react-native";

const mockNavigate = jest.fn();
const renderWithProviders = () => {
  render(
    <ThemeProvider>
      <NewsCard testID="newsCard" />
    </ThemeProvider>
  );
};

describe("NewsCard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test that the component renders correctly
  it("renders component correctly", () => {
    const { getByTestId } = renderWithProviders();
    expect(getByTestId("newsCard")).toBeTruthy();
  });
});
