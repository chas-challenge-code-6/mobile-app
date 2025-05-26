import { View, Platform, StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DataScreen from "../screens/DataScreen";
import TabNavigator from "./TabNavigator";
import Logo from "../components/Logo";
import { useTheme } from "../context/ThemeContext";

const Drawer = createDrawerNavigator();

const screenList = [
  "Temperature",
  "Humidity",
  "Heart rate",
  "Steps",
  "Gas",
  "Noise level",
];

const DrawerNavigator = () => {
  const { theme } = useTheme();
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: "right",
          drawerType: "front",
          swipeEnabled: true,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: Platform.OS === "ios" ? 70 : 70, // Ökad headerhöjd
          },
          drawerStyle: {
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
          drawerContentStyle: {
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          },
          drawerActiveBackgroundColor: theme.colors.snow,
          drawerActiveTintColor: theme.colors.heading,
          drawerInactiveTintColor: theme.colors.heading,
          headerTitleAlign: "left", // Fixar vänsterjustering i iOS
          headerTintColor: theme.colors.tabicon,
        }}
      >
        <Drawer.Screen
          name="Sentinel"
          component={TabNavigator}
          options={{
            popToTopOnBlur: true,
            drawerItemStyle: {
              display: "none",
            },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  paddingLeft: Platform.OS === "ios" ? 0 : 16,
                  alignItems: "flex-start",
                }}
              >
                <Logo width={140} height={34} color={theme.colors.tabicon} />
              </View>
            ),
          }}
        />
        {screenList.map((item, index) => (
          <Drawer.Screen
            key={index}
            name={item}
            component={DataScreen}
            initialParams={{ stackTitle: item }}
            options={{
              headerTitle: () => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    paddingLeft: Platform.OS === "ios" ? 0 : 16,
                    alignItems: "flex-start",
                  }}
                >
                  <Logo width={140} height={34} color={theme.colors.tabicon} />
                </View>
              ),
            }}
          />
        ))}
        <Drawer.Item onPress={() => logOut()} />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigator;
