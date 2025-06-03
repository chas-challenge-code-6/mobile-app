import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Card from "./Card";
import { useNavigation } from "@react-navigation/native";
import NewsCard from "./NewsCard";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirstNotWatched } from "../utils/notWatchedNews";
import { useNotWatched } from "../context/NewsContext";
import { getNews } from "../services/api"; // Importera API-funktionen

const CardSection = ({ title, prevTitle, route, arrow = true }) => {
  const { theme } = useTheme(); // Get theme

  const { stackTitle } = route ? route.params : {};
  const [news, setNews] = useState([]);
  const { notWatched, setNotWatched } = useNotWatched();
  let notWatchList = [];
  const styles = createStyles(theme, notWatched);
  const navigations = useNavigation();
  let category = "";

  if (title !== undefined || null) {
    category = title.replaceAll(" ", "_");
  }
  if (stackTitle !== undefined) {
    category = stackTitle.replaceAll(" ", "_");
  }

  // Hämta nyheter från API eller fallback till mockdata
  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log("CardSection: Fetching news from API...");
        const apiNews = await getNews();
        console.log("CardSection: API response:", apiNews);
        if (apiNews && apiNews.length > 0) {
          console.log("CardSection: Använder livedata för nyheter");
          setNews(apiNews);
        } else {
          console.log("CardSection: API inte tillgängligt, använder mockdata för nyheter");
          const mockNews = require("../data/news.json");
          setNews(mockNews);
        }
      } catch (error) {
        console.error("CardSection: Error fetching news:", error);
        // Fallback till mockdata
        const mockNews = require("../data/news.json");
        setNews(mockNews);
      }
    };

    if (news.length === 0) {
      fetchNews();
    }
  }, []);

  const singleNews = news.find((item) => item.heading === title);

  useEffect(() => {
    if (news.length > 0) {
      getFirstNotWatched(notWatchList, setNotWatched, notWatched, news);
    }
  }, [news]);

  const handleNewsPress = (item) => {
    const saveNotWatched = async () => {
      try {
        const result = await AsyncStorage.setItem(
          "NotWatched",
          JSON.stringify(notWatchList)
        );

        // if (!result) {
        //   throw new Error("Problem with saving not watched status to storage");
        // }
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
