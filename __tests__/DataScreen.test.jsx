import { render, waitFor } from "@testing-library/react-native";
import DataScreen from "../screens/DataScreen";
import { ThemeProvider } from "../context/ThemeContext";
import { NewsProvider } from "../context/NewsContext";
import { AuthProvider } from "../context/AuthContext";
import Navigation from "../navigation/Navigation";
const mockNavigate = jest.fn();
const mockTitle = "testTitle";
const mockRoute = jest.fn();
const renderWithProviders = () => {
  return render(
    <ThemeProvider>
      <AuthProvider>
        <NewsProvider>
          <Navigation>
            <DataScreen
              navigation={{ navigate: mockNavigate }}
              route={{ route: mockRoute }}
            />
          </Navigation>
        </NewsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

describe("DataScreen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  // tester som betas av innan jag kommer till rätt sida
  it("loading fonts first", async () => {
    const { getByTestId } = renderWithProviders();
    await waitFor(() => {
      expect(getByTestId("loadingFonts")).toBeTruthy();
    });
  });
  it("entryscreen visible", () => {
    const { getByTestId } = renderWithProviders();
    expect(getByTestId("entryView")).toBeTruthy();
  });
  it("animation runs its time", () => {
    callBack([setTimeout(800)]);
    const { getByRole } = renderWithProviders();
    expect(getByRole("header")).toBeTruthy();
  });
  it("loginpage visible", () => {
    const { getByText } = renderWithProviders();
    expect(getByText("Login")).toBeTruthy();
  });
  //   kommer just nu inte fram
  //   vad som ska testas egentligen
  it("datascreen visible", () => {
    const { getByRole } = renderWithProviders();
    expect(getByRole("button", { label: "Button to go back" })).toBeTruthy();
  });
});
