import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Image, Pressable, View, Text } from "react-native";

import Colors from "../../../constants/Colors";
import { useColorScheme } from "../../../components/useColorScheme";
import { useClientOnlyValue } from "../../../components/useClientOnlyValue";
import { AntDesign, Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import HeaderMenu from "../../../components/HeaderMenu";
import { useAuth } from "../../../context/authContext";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const [cachedImage, setCachedImage] = useState<any>(null);

  useEffect(() => {
    // Preload image when the tab is mounted
    if (user?.profileUrl) {
      const preloadImage = async () => {
        try {
          const response = await fetch(user.profileUrl as string);
          if (response.ok) {
            const blob = await response.blob();
            setCachedImage(URL.createObjectURL(blob));
          }
        } catch (error) {
          console.error("Error preloading image:", error);
        }
      };
      preloadImage();
    }
  }, [user?.profileUrl]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#FFF",
          position: "absolute",
          bottom: 0,
          padding: 10,
          width: "100%",
          zIndex: 0,
        },
        tabBarItemStyle: {
          // backgroundColor: "#00ff00",
          // borderRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          headerTitle: "",
          title: "Home",
          headerStyle: {
            backgroundColor: "#EEE",
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
            fontVariant: ["small-caps"],
          },
          tabBarActiveTintColor: "#1DAEFF",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="home" size={focused ? 26 : 24} color={focused ? "#1DAEFF" : color} />
          ),
          headerLeft: () => (
            <Image
              source={require("../../../assets/images/ecoflipr-logo-black.png")}
              style={{ width: 100, height: 20, marginLeft: 15 }}
            />
          ),
          headerRight: () => (
            <View className="flex-row items-start gap-2 mr-4 ">
              <Link href="/notificationModalScreen" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="notifications"
                      size={26}
                      color={"gray"}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <HeaderMenu imageUrl={cachedImage ?? user?.profileUrl} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: "Search",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#EEE",
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
            fontVariant: ["small-caps"],
          },
          tabBarActiveTintColor: "#1DAEFF",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="search1" size={focused ? 26 : 24} color={focused ? "#1DAEFF" : color} />
          ),
          headerLeft: () => (
            <Image
              source={require("../../../assets/images/ecoflipr-logo-black.png")}
              style={{ width: 100, height: 20, marginLeft: 15 }}
            />
          ),
          headerRight: () => (
            <View className="flex-row items-start gap-2 mr-4 ">
              <Link href="/notificationModalScreen" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="notifications"
                      size={26}
                      color={"gray"}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <HeaderMenu imageUrl={cachedImage ?? user?.profileUrl} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="create/index"
        options={{
          title: "Create",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#EEE",
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
            fontVariant: ["small-caps"],
          },
          tabBarActiveTintColor: "#1DAEFF",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="pluscircle" size={focused ? 26 : 24} color={focused ? "#1DAEFF" : color} />
          ),
          headerLeft: () => (
            <Image
              source={require("../../../assets/images/ecoflipr-logo-black.png")}
              style={{ width: 100, height: 20, marginLeft: 15 }}
            />
          ),
          headerRight: () => (
            <View className="flex-row items-start gap-2 mr-4 ">
              <Link href="/notificationModalScreen" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="notifications"
                      size={26}
                      color={"gray"}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <HeaderMenu imageUrl={cachedImage ?? user?.profileUrl} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="saved/index"
        options={{
          title: "Saved",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#EEE",
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
            fontVariant: ["small-caps"],
          },
          tabBarActiveTintColor: "#1DAEFF",
          tabBarIcon: ({ color, focused }) => (
            <View>
              <View>
                <Feather name="bookmark" size={focused ? 26 : 24} color={focused ? "#1DAEFF" : color} />
              </View>
              {user?.savedOffers && user.savedOffers.length > 0 && (
                <View className="absolute top-[-2px] right-[-4px] bg-blue-400 px-[6px] py-[2px] rounded-full">
                  <Text className="text-[10px] text-white font-medium">{user.savedOffers.length}</Text>
                </View>
              )}
            </View>
          ),
          headerLeft: () => (
            <Image
              source={require("../../../assets/images/ecoflipr-logo-black.png")}
              style={{ width: 100, height: 20, marginLeft: 15 }}
            />
          ),
          headerRight: () => (
            <View className="flex-row items-start gap-2 mr-4 ">
              <Link href="/notificationModalScreen" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="notifications"
                      size={26}
                      color={"gray"}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <HeaderMenu imageUrl={cachedImage ?? user?.profileUrl} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#EEE",
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
            fontVariant: ["small-caps"],
          },
          tabBarActiveTintColor: "#1DAEFF",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={focused ? 26 : 24}
              color={focused ? "#1DAEFF" : color}
            />
          ),
          headerLeft: () => (
            <Image
              source={require("../../../assets/images/ecoflipr-logo-black.png")}
              style={{ width: 100, height: 20, marginLeft: 15 }}
            />
          ),
          headerRight: () => (
            <View className="flex-row items-start gap-2 mr-4 ">
              <Link href="/notificationModalScreen" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="notifications"
                      size={26}
                      color={"gray"}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <HeaderMenu imageUrl={cachedImage ?? user?.profileUrl} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
