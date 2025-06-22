import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Layout from "../components/layout/Layout";
import CardSection from "../components/CardSection";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DataScreen = ({ route, title, navigation }) => {
  const { stackTitle, prevTitle } = route.params || "Temperature";
  const { theme } = useTheme();
  const handleOnPress = () => {
    if (prevTitle === "News") {
      navigation.navigate("NewsStack");
    } else {
      navigation.goBack();
    }
  };

  return (
    <Layout scrollable>
      <View style={{ flex: 1, gap: 24 }}>
        <Pressable
          onPress={() => handleOnPress()}
          accessibilityRole="button"
          accessibilityLabel={`Button to go back`}
          accessibilityHint={`Go back to ${
            prevTitle === "News" ? "newspage" : "previous page"
          }`}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={40}
            color={theme.colors.primary}
          />
        </Pressable>

        <CardSection
          title={title !== undefined ? title : stackTitle}
          prevTitle={prevTitle !== undefined ? prevTitle : undefined}
          arrow={false}
        />
        {prevTitle !== "News" && (
          <Text style={theme.textStyles.titleMedium}>Averages</Text>
        )}
      </View>
    </Layout>
  );
};

export default DataScreen;

const styles = StyleSheet.create({});
