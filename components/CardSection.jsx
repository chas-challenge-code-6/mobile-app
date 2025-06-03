import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Card from "./Card";
import { useNavigation } from "@react-navigation/native";
import NewsCard from "./NewsCard";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirstNotWatched } from "../utils/notWatchedNews";
import { useNotWatched } from "../context/NewsContext";
import { useAuth } from "../context/AuthContext";

const CardSection = ({ title, prevTitle, route, arrow = true }) => {
  const { theme } = useTheme(); // Get theme
  const { stackTitle } = route ? route.params : {};
  const { notWatched, setNotWatched } = useNotWatched();
  const { savedToken, setSavedToken, checkToken } = useAuth();
  const [news, setNews] = useState([]);
  const styles = createStyles(theme, notWatched);
  const navigations = useNavigation();
  let notWatchList = [];
  let category = "";

  if (title !== undefined || null) {
    category = title.replaceAll(" ", "_");
  }
  if (stackTitle !== undefined) {
    category = stackTitle.replaceAll(" ", "_");
  }
  if (news == "") {
    const data = require("../data/news.json");
    setNews(data);
  }
  const singleNews = news.find((item) => item.heading === title);

  useEffect(() => {
    getFirstNotWatched(notWatchList, setNotWatched, notWatched, news);
  }, []);
  const handleNewsPress = (item) => {
    const saveNotWatched = async () => {
      try {
        const result = await AsyncStorage.setItem(
          "NotWatched",
          JSON.stringify(notWatchList)
        );
      } catch (error) {
        console.error(error);
      }
    };
    notWatchList = notWatched;

    const foundIndex = notWatched.indexOf(item.heading);

    if (foundIndex !== -1) {
      if (notWatched.length > 1) {
        notWatchList.splice(foundIndex, 1);
      } else if (notWatched.length === 1) {
        notWatchList[0] = "";
      }
      saveNotWatched();
      setNotWatched(notWatchList);
    }

    navigations.navigate("DataStack", {
      stackTitle: item.heading,
      prevTitle: title,
    });
  };

  return (
    <View accessible={true} style={styles.outerContainer}>
      {prevTitle === undefined && (
        <Text
          style={
            title === "News"
              ? theme.textStyles.titleLarge
              : theme.textStyles.titleMedium
          }
          accessibilityRole="header"
        >
          {title}
        </Text>
      )}

      {prevTitle === "News" && (
        <NewsCard item={singleNews} arrow={false} showMore={true} />
      )}
      {title === "News" &&
        news.map((item) => (
          <Pressable
            key={item.id}
            style={[
              notWatched.find((itm) => itm === item.heading)
                ? styles.noWatch
                : styles.watched,
              styles.pressable,
            ]}
            accessibilityRole="link"
            accessibilityLabel={`Link to ${item.heading} page`}
            accessibilityHint={`Go to ${item.heading} page for more information`}
            onPress={() => {
              handleNewsPress(item);
            }}
          >
            <NewsCard
              item={item}
              arrow={arrow}
              showMore={false}
              notWatched={notWatched[item.id - 1]}
            />
          </Pressable>
        ))}
      {title !== "News" && prevTitle !== "News" && (
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`Link to ${
            title !== undefined ? title : stackTitle
          } page`}
          accessibilityHint={`Go to ${
            title ? title : stackTitle
          } page for more information`}
          onPress={() =>
            navigations.navigate("DataStack", {
              stackTitle: title !== undefined ? title : stackTitle,
            })
          }
        >
          <Card title={category.toLowerCase()} arrow={arrow} />
        </Pressable>
      )}
    </View>
  );
};

export default CardSection;

const createStyles = (theme) =>
  StyleSheet.create({
    outerContainer: { flex: 1, gap: 16 },
    pressable: {
      borderWidth: 2,
      borderRadius: theme.radius.md + 2,
    },
    noWatch: {
      borderColor: theme.colors.accent,
    },
    watched: {
      borderColor: theme.colors.snow,
    },
  });
