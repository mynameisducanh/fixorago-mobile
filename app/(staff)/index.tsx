import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Overview from "@/components/staff/overview";
import Categories from "@/components/staff/Categories";
import PostCard from "@/components/staff/PostCard";
import { useRouter } from "expo-router";

const HomeStaff = () => {
  const onCatChanged = (category: string) => {
    console.log(category);
  };
  const router = useRouter();
  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <Overview />
        <View className="flex-row justify-between px-3 mt-2 items-center">
          <Text className="text-lg font-bold">Danh sách yêu cầu</Text>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/post/ListPost",
              });
            }}
          >
            <Text className="text-blue-500 text-base font-semibold">
              Xem thêm
            </Text>
          </TouchableOpacity>
        </View>
        <Categories onCategoryChanged={onCatChanged} />
        <View className="mt-3">
          <PostCard />
          <PostCard />
          <PostCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeStaff;
