import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Item from "../components/Item";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const data = [...Array(5)];

export default function TabOneScreen() {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="add-sharp" color={"#007AFF"} size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEdit(!edit)}>
          <Text style={{ color: "#007AFF", fontWeight: "500", fontSize: 18 }}>
            {edit ? "Done" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          style={{ borderRadius: 15 }}
          data={data}
          renderItem={({ item, index }) => <Item key={index} edit={edit} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e9ecef",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    width: "25%",
    justifyContent: "space-between",
    marginRight: 20,
  },
  list: {
    width: "100%",
    marginTop: 10,
    padding: 8,
    borderRadius: 30,
  },
});
