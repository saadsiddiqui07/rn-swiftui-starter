import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  edit: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Item = ({ edit }: Props) => {
  const router = useRouter();
  const textValue = useSharedValue(0);
  const btnValue = useSharedValue(0);

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(textValue.value, [0, 0.5, 1], [-5, 10, 20]),
        },
      ],
    };
  });

  const animatedButton = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(btnValue.value, [0, 1], [-35, 5]),
        },
      ],
    };
  });

  useEffect(() => {
    if (edit) {
      textValue.value = withSpring(1);
      btnValue.value = withSpring(1);
    } else {
      textValue.value = withSpring(0);
      btnValue.value = withSpring(0);
    }
  }, [edit]);

  return (
    <View style={{ backgroundColor: "white", flexDirection: "row" }}>
      <AnimatedTouchable
        style={styles.container}
        activeOpacity={0.2}
        disabled={edit}
        onPress={() => router.push("/(tabs)/item")}
      >
        <Animated.View style={[animatedButton]}>
          <Ionicons
            name="ios-remove-circle-sharp"
            size={25}
            color={"red"}
            //   style={{ marginRight: 10 }}
          />
        </Animated.View>

        <Animated.Text
          style={[{ ...styles.text, opacity: edit ? 0.5 : 1 }, animatedText]}
        >
          Wed 29 Nov, 23:10:14 PM
        </Animated.Text>
        <Ionicons
          name="chevron-forward"
          size={22}
          color={"gray"}
          style={{ marginLeft: "auto", opacity: edit ? 0.5 : 1 }}
        />
      </AnimatedTouchable>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 10,
    flex: 1,
  },
  text: {
    fontSize: 17,
    fontWeight: "400",
    // transform: [{ translateX: 40 }],
  },
});
