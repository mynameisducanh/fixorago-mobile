import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "expo-router";
import { useAppAlert } from "@/hooks/useAppAlert";
import { validateLoginForm } from "@/utils/validation";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Login = () => {
  const { login } = useUserStore();
  const [secure, setSecure] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showAlert } = useAppAlert();

  const handleLogin = () => {
    const errorMessage = validateLoginForm({ username, password });
    if (errorMessage) {
      showAlert("Lỗi đăng nhập", errorMessage);
      return;
    }
    login({ username, password });
  };

  return (
    <View
      style={{ height: hp(100), width: wp(100) }}
      className="flex-1 bg-white items-center justify-center px-6 space-y-6"
    >
      <Image
        source={require("@/assets/images/auth-screen.png")}
        className="w-[80%] h-[30%] object-contain"
      />

      <Text className="text-2xl font-bold text-gray-800 mt-5">
        Chào mừng trở lại!
      </Text>
      <Text className="text-base text-gray-500 mb-2">
        Vui lòng đăng nhập để tiếp tục
      </Text>

      <View className="w-full flex-row items-center border border-gray-300 rounded-full px-3 py-2 mt-3">
        <Ionicons name="person-outline" size={20} color="#888" />
        <TextInput
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
          className="flex-1 ml-2 text-base"
          placeholderTextColor="#888"
        />
      </View>

      <View className="w-full flex-row items-center border border-gray-300 rounded-full px-3 py-2 mt-3">
        <Ionicons name="lock-closed-outline" size={20} color="#888" />
        <TextInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secure}
          className="flex-1 ml-2 text-base"
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="w-full bg-black py-4 rounded-full items-center mt-3"
        onPress={handleLogin}
      >
        <Text className="text-white font-semibold text-base">Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          showAlert("Tính năng chưa hỗ trợ", "Vui lòng liên hệ quản trị viên.")
        }
      >
        <Text className="text-sm text-blue-600 mt-2">Quên mật khẩu?</Text>
      </TouchableOpacity>

      <View className="flex-row space-x-1 mt-6">
        <Text className="text-sm text-gray-600">Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text className="text-sm text-blue-600 font-medium">
            Đăng ký ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
