import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, StatusBar, Text } from "react-native";
import Shield from "../components/Shield";
import Sentinel from "../components/Sentinel";

const EntryScreen = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#D5E2E2" barStyle="dark-content" hidden={true} />
      <Animated.View style={[styles.logoContainer, { opacity, transform: [{ scale }] }]}>
        <Shield width={120} height={120} />
        <Sentinel width={160} height={160} />
      </Animated.View> */}
      <Text>Testa skärm</Text>
    </View>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#D5E2E2",
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
