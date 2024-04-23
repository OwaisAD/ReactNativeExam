import React from "react";
import { View } from "../components/Themed";
import { ActivityIndicator } from "react-native";

export default function StartPage() {
  return (
    <View className="flex-1 justify-center">
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}
