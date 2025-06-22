import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { months, dates } from "../utils/months";
import { useEffect, useState } from "react";

const NewsCard = ({ item, arrow, showMore }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const time = item.timestamp;
  const monthNumber = time.substring(5, 7);
  const dateNumber = time.substring(8, 10);
  const yearNumber = time.substring(0, 4);
  const [date, setDate] = useState("");

  useEffect(() => {
    const getMonth = () => {
      const monthResult = months(monthNumber);
      const dateResult = dates(dateNumber);

      if (!monthResult || !dateResult) {
        console.error("Något gick fel med tidens hämtning");
      } else {
        setDate(`${dateResult} ${monthResult}, ${yearNumber}`);
      }
    };
    getMonth();
  }, []);

  return (
    <View style={styles.outerContainer} testID="newsCard">
      <View key={item.id} style={styles.innerContainer}>
        <View style={styles.topRow}>
          <Text style={theme.textStyles.textBody}>{date}</Text>
          <View
            accessibilityRole="button"
            accessibilityLabel="Button to go back"
            accessibilityHint="Go back to previous page"
          >
            {arrow && (
              <MaterialCommunityIcons
                name="chevron-right"
                color={theme.colors.accent}
                size={24}
              />
            )}
          </View>
        </View>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={theme.textStyles.unitSmall}>{item.heading}</Text>
        {showMore ? (
          <Text style={theme.textStyles.textBody}>{item.message}</Text>
        ) : (
          <Text style={theme.textStyles.textBody} numberOfLines={1}>
            {item.message}...
          </Text>
        )}
      </View>
    </View>
  );
};

export default NewsCard;

const createStyles = (theme) =>
  StyleSheet.create({
    outerContainer: {
      flex: 1,
      gap: 16,
    },
    innerContainer: {
      backgroundColor: theme.colors.snow,
      borderRadius: theme.radius.md,
      paddingHorizontal: 16,
      paddingVertical: 16,
      flex: 1,
      gap: 10,
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    image: {
      width: "100%",
      height: 240,
      borderRadius: theme.radius.md,
    },
  });
