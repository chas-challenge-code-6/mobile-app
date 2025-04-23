import React, { createContext, useContext } from 'react';

/* Struktur med separata blocks och återanvändning - för större appar / team / design systems.
Då är det ofta bättre att organisera temat hierarkiskt och separat.
Fördelar med detta:
Alla styles är återanvändbara och tydligt uppdelade.
Vi kan lätt utöka med fler komponenter (t.ex. button, input, osv.).
Lättare att tematisera om hela appen eller införa dark mode längre fram.
Vi får fortfarande tillgång till allt via const { theme } = useTheme();.
*/

// Colors
const colors = {
  background: '#d9d9d9',
  primary: '#333',
  secondary: '#bbb',
  accent: 'blue',
  text: '#333',
  border: 'red',
  muted: '#666',
  white: '#fff',
};

// Fonts
const fonts = {
  heading: 44,
  body: 16,
  small: 14,
  family: 'System',
};

// Spacing
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Radius
const radius = {
  sm: 4,
  md: 8,
  lg: 16,
};

// Text styles
const textStyles = {
  textBody: {
    marginBottom: spacing.sm,
    color: colors.text,
    fontSize: fonts.body,
    fontWeight: '400',
    lineHeight: 22,
  },
  titleLarge: {
    marginBottom: spacing.sm,
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  titleMedium: {
    marginBottom: spacing.sm,
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  titleSmall: {
    marginBottom: spacing.xs,
    color: colors.text,
    fontSize: fonts.body,
    fontWeight: '700',
  },
  titleMeta: {
    marginBottom: spacing.xs,
    color: colors.muted,
    fontSize: fonts.body,
    letterSpacing: 0.5,
  },
  unitLarge: {
    //marginBottom: spacing.xs,
    color: colors.text,
    fontSize: 40,
    letterSpacing: 0.5,
    fontWeight: '900',
  },
  unitSmall: {
    //marginBottom: spacing.xs,
    color: colors.text,
    fontSize: 24,
    fontWeight: '600',
  },
};

// Component styles

/* React Native används JavaScript-objekt för att definiera stilar,
och värden måste vara strängar om de inte är nummer eller variabelreferenser. 
Så "flex" och "space-between" måste skrivas som strängar. */
const components = {
  card: {
    alignItems: "center", // För vertikal centering
    backgroundColor: colors.white,
    borderRadius: radius.md,
    display: "flex", //display: "flex" är överflödigt i React Native, eftersom flex är standard på alla View-komponenter
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
    padding: spacing.sm,
  },
  cardContainer: {
    //borderLeftWidth: 8,
    //alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 16,
    overflow: "hidden",
    paddingRight: 16,
    //paddingVertical: 12,
  },
  cardStripe: {
    width: 6,
    backgroundColor: "red",
    borderTopLeftRadius: radius.md,
    borderBottomLeftRadius: radius.md,
    height: "100%",
    //width: 0, // Använder borderLeft istället
  },
  icon: {
    //marginHorizontal: 12,
    alignSelf: "center",
    // borderWidth: 2,
    // borderColor: "red",
    paddingHorizontal: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: "#444",
    paddingVertical: 12,
  },
};

const rows = {
  row: {
    //flexDirection: "column",
    justifyContent: "space-between",
  },
};

const theme = {
  colors,
  fonts,
  spacing,
  radius,
  textStyles,
  ...components, // Direct access to for example theme.card 
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);



// OUR OLD STYLING

/* I mindre till medelstora projekt - direkt referens efteråt är helt okej.
Enkelt att förstå.
Lätt att underhålla.
Vi duplicerar inte data.
Vi kan lätt ändra t ex theme.colors.border senare, och allt som använder det följer med.
*/

// import React, { createContext, useContext } from 'react';

// const ThemeContext = createContext();

// const theme = {
//   colors: {
//     background: '#d9d9d9',
//     primary: '#0066cc',
//     secondary: '#ff4081',
//     accent: 'blue',
//     text: '#333',
//     border: 'red',
//   },
//   fonts: {
//     heading: 44,
//     body: 16,
//     small: 14,
//     family: 'System',
//   },
//   spacing: {
//     xs: 4,
//     sm: 8,
//     md: 16,
//     lg: 24,
//     xl: 32,
//   },
//   radius: {
//     sm: 4,
//     md: 8,
//     lg: 16,
//   },
//   textBody: {
//     marginBottom: 8,
//     color: '#333',
//     fontSize: 16,
//     fontWeight: '400',
//     lineHeight: 22,
//   },
//   titleLarge: {
//     marginBottom: 8,
//     color: '#333',
//     fontSize: 28,
//     fontWeight: '700',
//   },
//   titleMedium: {
//     marginBottom: 8,
//     color: '#333',
//     fontSize: 20,
//     fontWeight: '700',
//   },
//  titleSmall: {
//    marginBottom: 2,
//     color: '#333',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   titleMeta: {
//     marginBottom: 2,
//     color: '#666',
//     fontSize: 16,
//     letterSpacing: 0.5,
//    },
//    unitLarge: {
//     marginBottom: 2,
//     color: '#333',
//     fontSize: 40,
//     letterSpacing: 0.5,
//     fontWeight: '900',
//    },
//     unitSmall: {
//       marginBottom: 2,
//       color: '#333',
//       fontSize: 24,
//       fontWeight: '600',
//    },
//    card: {
//     backgroundColor: '#fff',
//     borderColor: theme.colors.border,
//     borderWidth: 1,
//     padding: 12,
//     marginBottom: 12,
//   }
// };

// export const ThemeProvider = ({ children }) => {
//   return (
//     <ThemeContext.Provider value={{ theme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
