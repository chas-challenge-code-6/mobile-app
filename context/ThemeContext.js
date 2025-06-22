import React, { createContext, useContext, useState } from "react";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";

// Light mode
const lightColors = {
  background: "#D5E2E2",
  primary: "#204054",
  secondary: "#D5E2E2",
  accent: "#46D2CA",
  warning: "#F26627",
  heading: "#204054",
  text: "#204054",
  icon: "#204054",
  tabicon: "#fff",
  unit: "#204054",
  border: "#fff",
  snow: "#fff",
  light: "#204054",
  dark: "#204054",
};

// Dark mode
const darkColors = {
  background: "#204054",
  primary: "#D5E2E2",
  secondary: "#D5E2E2",
  accent: "#46D2CA",
  warning: "#F26627",
  heading: "#fff",
  text: "#204054",
  icon: "#204054",
  tabicon: "#204054",
  unit: "#204054",
  border: "#fff",
  snow: "#fff",
  light: "#D5E2E2",
  dark: "#204054",
};

const fonts = {
  heading: 44,
  body: 16,
  small: 14,
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const radius = {
  sm: 4,
  md: 8,
  lg: 16,
};

const fontStyles = {
  light: { fontFamily: "Quicksand-Light", fontWeight: "300" },
  regular: { fontFamily: "Quicksand-Regular", fontWeight: "400" },
  medium: { fontFamily: "Quicksand-Medium", fontWeight: "500" },
  semibold: { fontFamily: "Quicksand-SemiBold", fontWeight: "600" },
  bold: { fontFamily: "Quicksand-Bold", fontWeight: "700" },
};

// Create text styles depening on color theme
const getTextStyles = (colors) => ({
  textBody: {
    marginBottom: spacing.sm,
    color: colors.text,
    fontFamily: "Quicksand-Regular",
    fontSize: fonts.body,
    lineHeight: 22,
    flex: 1,
  },
  titleLarge: {
    marginBottom: spacing.md,
    color: colors.heading,
    fontFamily: "Quicksand-Bold",
    fontSize: 28,
  },
  titleMedium: {
    marginBottom: spacing.sm,
    color: colors.heading,
    fontFamily: "Quicksand-Bold",
    fontSize: 20,
  },
  titleSmall: {
    marginBottom: spacing.xs,
    color: colors.text,
    fontFamily: "Quicksand-Bold",
    fontSize: fonts.body,
    fontWeight: "700",
  },
  inputTitle: {
    marginBottom: spacing.xs,
    color: colors.heading,
    fontFamily: "Quicksand-Bold",
    fontSize: fonts.body,
    fontWeight: "700",
  },
  textLabel: {
    marginBottom: 2,
    color: colors.text,
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  titleMeta: {
    marginBottom: spacing.xs,
    color: colors.heading,
    fontFamily: "Quicksand-Bold",
    fontSize: fonts.body,
  },
  unitLarge: {
    color: colors.unit,
    fontSize: 40,
    letterSpacing: 0.5,
    fontFamily: "Quicksand-Bold",
  },
  unitSmall: {
    color: colors.unit,
    fontSize: 24,
    fontFamily: "Quicksand-SemiBold",
  },
});

// Create component styles depening on color theme
const getComponents = (colors) => ({
  card: {
    alignItems: "center",
    backgroundColor: colors.snow,
    borderRadius: radius.md,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 90,
  },
  icon: {
    alignSelf: "center",
    paddingHorizontal: 12,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Quicksand-Regular",
    color: colors.text,
    paddingVertical: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
    color: colors.text,
  },
});

// Create the theme dynamically
const createTheme = (mode) => {
  const colors = mode === "dark" ? darkColors : lightColors;
  return {
    mode,
    colors,
    fonts,
    spacing,
    radius,
    fontStyles,
    textStyles: getTextStyles(colors),
    ...getComponents(colors),
  };
};

// Context and Provider
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light"); // Light mode is default

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = createTheme(mode);

  const [fontsLoaded] = useFonts({
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View testID="loadingFonts">
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export hook for use of theme
export const useTheme = () => useContext(ThemeContext);

/* Struktur med separata blocks och återanvändning - för större appar / team / design systems.
Då är det ofta bättre att organisera temat hierarkiskt och separat.
Fördelar med detta:
Alla styles är återanvändbara och tydligt uppdelade.
Vi kan lätt utöka med fler komponenter (t.ex. button, input, osv.).
Lättare att tematisera om hela appen eller införa dark mode längre fram.
Vi får fortfarande tillgång till allt via const { theme } = useTheme();.
*/

/*
Förklaring font:

Vår font laddas via via useFonts.
För att fonten faktiskt ska kunna används i våra textStyles måste vi ange fontFamily i textstilerna.

I React Native (särskilt med egna fonter i Expo) måste vi manuellt ange fontFamily, 
eftersom enbart fontWeight inte fungerar tillsammans med anpassade fonter om vi inte skapar en variant per vikt.
*/
