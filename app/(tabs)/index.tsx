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
import uuid from "react-native-uuid";

interface ItemProps {
  id: string | number[];
  text: string;
}

export default function TabOneScreen() {
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<ItemProps[]>([]);

  const handleRemove = (id: string) => {
    const newArr = data.filter((d) => {
      return d.id !== id;
    });
    setData(newArr);
  };

  const handleAddData = () => {
    const today = new Date().toDateString();
    const t = new Date().toLocaleTimeString();

    const newItem = `${today}, ${t}`;
    const id = uuid.v4();

    setData([...data, { id, text: newItem }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleAddData}>
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
          renderItem={({ item, index }) => (
            <Item
              key={index}
              index={index}
              edit={edit}
              item={item}
              onRemove={handleRemove}
            />
          )}
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
