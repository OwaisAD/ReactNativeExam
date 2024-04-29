import { FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import EditScreenInfo from "../../../../components/EditScreenInfo";
import { Text, View } from "../../../../components/Themed";
import CustomKeyboardView from "../../../../components/CustomKeyboardView";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { ForYou } from "../../../../components/homeoffers/ForYou";
import { Recent } from "../../../../components/homeoffers/Recent";
import { Random } from "../../../../components/homeoffers/Random";
import { Viewed } from "../../../../components/homeoffers/Viewed";
import { Saved } from "../../../../components/homeoffers/Saved";
import Tabs from "../../../../components/homeoffers/Tabs";

export default function HomeScreen() {
  const options = ["For you", "Recent", "Random", "Viewed", "Saved"];
  const [activeTab, setActiveTab] = useState(options[0]);

  const displayContent = () => {
    switch (activeTab) {
      case "For you":
        return <ForYou />;
      case "Recent":
        return <Recent />;
      case "Random":
        return <Random />;
      case "Viewed":
        return <Viewed />;
      case "Saved":
        return <Saved />;
      default:
        return <ForYou />;
    }
  };

  return (
    <View className="bg-[#EEE] flex-1 px-4">
      <View className="flex-row space-x-5 px-2 py-1 items-center rounded-xl border-blue-100 border my-4">
        <TextInput
          className="bg-white p-2 rounded-lg w-full flex-1 font-semibold text-neutral-700"
          placeholder="Search on EcoFlipr"
          autoCapitalize="none"
        />
        <View className="px-1">
          <FontAwesome5 name="search" size={20} color="#1DAEFF" />
        </View>
      </View>

      <Tabs tabs={options} activeTab={activeTab} setActiveTab={setActiveTab} />

      <View className="flex-1 bg-[#EEE]">{displayContent()}</View>
    </View>
  );
}
