import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Entypo, Feather, Octicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import Loading from "../../components/Loading";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const phoneNumberRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !firstNameRef.current ||
      !lastNameRef.current ||
      !phoneNumberRef.current
    ) {
      Alert.alert("Sign up", "Please fill in all fields");
      return;
    }

    // validate with ZOD

    // register process
  };

  return (
    <ImageBackground
      source={require("../../assets/images/auth-background.png")}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <CustomKeyboardView>
        <StatusBar style="dark" />
        <View className="flex-1 w-full">
          {/* TOP */}
          <View style={{ paddingTop: hp(8), paddingLeft: wp(5) }}>
            <Text className="text-4xl font-normal">Create account</Text>
            <Image
              source={require("../../assets/images/ecoflipr-logo-black.png")}
              style={{ width: wp("50%"), height: hp("10%"), resizeMode: "contain" }}
              height={100}
              width={100}
            />
          </View>

          {/* BOTTOM */}
          <View className="space-y-2">
            <View className="items-center justify-center mx-8 mt-8 space-y-4 bg-[#D1D5DB] p-4 rounded-xl">
              {/* sign in with email btn */}

              {/* sign in with email form */}
              <View className="w-full space-y-4">
                {/* inputs */}
                <View className="flex-row w-full space-x-4">
                  <View
                    style={{ height: hp(7) }}
                    className="flex-row space-x-5 px-4 bg-neutral-100 items-center rounded-2xl flex-1"
                  >
                    <TextInput
                      onChangeText={(text) => (firstNameRef.current = text)}
                      style={{ fontSize: hp(2) }}
                      className="flex-1 font-semibold text-neutral-700"
                      placeholder="First name"
                      placeholderTextColor={"gray"}
                    />
                  </View>
                  <View
                    style={{ height: hp(7) }}
                    className="flex-row space-x-5 px-4 bg-neutral-100 items-center rounded-2xl flex-1"
                  >
                    <TextInput
                      onChangeText={(text) => (lastNameRef.current = text)}
                      style={{ fontSize: hp(2) }}
                      className="flex-1 font-semibold text-neutral-700"
                      placeholder="Last name"
                      placeholderTextColor={"gray"}
                    />
                  </View>
                </View>

                <View
                  style={{ height: hp(7) }}
                  className="flex-row space-x-5 px-4 bg-neutral-100 items-center rounded-2xl"
                >
                  <Octicons name="mail" size={hp(2.7)} color="gray" />
                  <TextInput
                    onChangeText={(text) => (emailRef.current = text)}
                    style={{ fontSize: hp(2) }}
                    className="flex-1 font-semibold text-neutral-700"
                    placeholder="Email address"
                    placeholderTextColor={"gray"}
                  />
                </View>

                <View
                  style={{ height: hp(7) }}
                  className="flex-row space-x-5 px-4 bg-neutral-100 items-center rounded-2xl"
                >
                  <Octicons name="lock" size={hp(2.7)} color="gray" />
                  <TextInput
                    onChangeText={(text) => (passwordRef.current = text)}
                    secureTextEntry={!showPassword}
                    style={{ fontSize: hp(2) }}
                    className="flex-1 font-semibold text-neutral-700"
                    placeholder="Password"
                    placeholderTextColor={"gray"}
                  />
                  {showPassword ? (
                    <Entypo name="eye-with-line" size={hp(2.7)} color="gray" onPress={() => setShowPassword(!showPassword)} />
                  ) : (
                    <Entypo name="eye" size={hp(2.7)} color="gray" onPress={() => setShowPassword(!showPassword)} />
                  )}
                </View>

                <View
                  style={{ height: hp(7) }}
                  className="flex-row space-x-5 px-4 bg-neutral-100 items-center rounded-2xl"
                >
                  <Feather name="phone" size={hp(2.7)} color="gray" />
                  <TextInput
                    onChangeText={(text) => (phoneNumberRef.current = text)}
                    style={{ fontSize: hp(2) }}
                    className="flex-1 font-semibold text-neutral-700"
                    placeholder="Phone number"
                    placeholderTextColor={"gray"}
                  />
                </View>

                {/* submit btn */}
                {loading ? (
                  <View className="flex-row justify-center">
                    <Loading size={hp(8)} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleRegister}
                    style={{ height: hp(6.5) }}
                    className="bg-indigo-500 rounded-xl justify-center items-center"
                  >
                    <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
                      Create Account
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text className="font-medium text-sm">Or sign up with one of the following</Text>

              <View className="flex-row w-full space-x-4">
                {/* sign in with google btn */}
                <TouchableOpacity className="bg-[#6B7280] p-4 rounded-xl flex-1 flex-row items-center justify-center space-x-2">
                  <AntDesign name="google" size={24} color="white" />
                  <Text className="text-white text-center text-base font-medium">Google</Text>
                </TouchableOpacity>

                {/* sign in with facebook btn */}
                <TouchableOpacity className="bg-[#6B7280] p-4 rounded-xl flex-1 flex-row items-center justify-center space-x-2">
                  <AntDesign name="facebook-square" size={24} color="white" />
                  <Text className="text-white text-center text-base font-medium">Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row items-center justify-center space-x-1 mb-10">
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold">
                Already have an account?
              </Text>
              <Pressable onPress={() => router.push("/signin/")}>
                <Text style={{ fontSize: hp(1.8) }} className="text-indigo-500 font-bold">
                  Sign in
                </Text>
              </Pressable>
            </View>
          </View>

          {/* <View className="flex-1 items-center justify-center">
            <Text className="text-white text-center text-sm font-medium mt-4">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View> */}
        </View>
      </CustomKeyboardView>
    </ImageBackground>
  );
}
import CustomKeyboardView from "../../components/CustomKeyboardView";
