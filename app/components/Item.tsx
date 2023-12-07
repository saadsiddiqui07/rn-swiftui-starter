import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface Props {
  onRemove: (arg1: string) => void;
  index: any;
  edit: boolean;
  item: any;
}

// const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedRemoveButton = Animated.createAnimatedComponent(Pressable);
const AnimatedDeleteButton = Animated.createAnimatedComponent(Pressable);

const Item = ({ edit, item, index, onRemove }: Props) => {
  const router = useRouter();
  const textValue = useSharedValue(0);
  const btnValue = useSharedValue(0);
  const opacity = useSharedValue(1);
  const [toDelete, setToDelete] = useState<any>(null);

  const animatedMainView = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      // transform: [{ translateY: opacity.value * 20 }], // You can customize the exit animation here
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(textValue.value, [0, 0.5, 1], [-10, 10, 20]),
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

  const handleDelete = () => {
    opacity.value = withTiming(0, { duration: 1000, easing: Easing.linear });
    onRemove(item.id);
  };

  useEffect(() => {
    if (edit) {
      textValue.value = withSpring(1);
      btnValue.value = withSpring(1);
    } else {
      textValue.value = withSpring(0);
      btnValue.value = withSpring(0);
    }
  }, [edit]);
  console.log(toDelete);
  return (
    <Animated.View
      // entering={SlideInLeft.delay(index * 1.5).duration(900)}
      style={[styles.main, animatedMainView]}
    >
      <TouchableOpacity
        style={[styles.container]}
        activeOpacity={0.2}
        onPress={() => !edit && router.push("/(tabs)/item")}
      >
        <AnimatedRemoveButton
          style={[animatedButton]}
          onPress={() => setToDelete(item.id)}
        >
          <TouchableOpacity>
            <Ionicons name="ios-remove-circle-sharp" size={25} color={"red"} />
          </TouchableOpacity>
        </AnimatedRemoveButton>

        <Animated.Text
          style={[{ ...styles.text, opacity: edit ? 0.5 : 1 }, animatedText]}
        >
          {item.text}
        </Animated.Text>
        <Ionicons
          name="chevron-forward"
          size={22}
          color={"gray"}
          style={{ marginLeft: "auto", opacity: edit ? 0.5 : 1 }}
        />
      </TouchableOpacity>
      {toDelete === item.id ? (
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Delete</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </Animated.View>
  );
};

export default Item;

const styles = StyleSheet.create({
  main: { backgroundColor: "white", flexDirection: "row" },
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
  },
});
