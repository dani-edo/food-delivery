import React, { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import {
  categoryData,
  initialCurrentLocation,
  restaurantData,
} from "../dummy/home";
import { CategoryDataType } from "../types/general";

type Props = {};

const Home: React.FunctionComponent<Props> = () => {
  const [categories, setCategories] =
    useState<CategoryDataType[]>(categoryData);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryDataType | null>(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation
  );

  const onSelectCategory = (item: CategoryDataType) =>
    setSelectedCategory(item);

  const renderHeader = () => {
    return (
      <View
        style={{
          height: 50,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.lightGray3,
              width: "70%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMainCategories = () => {
    const renderItem = ({ item }: { item: CategoryDataType }) => (
      <TouchableOpacity
        style={{
          padding: SIZES.padding,
          backgroundColor:
            selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
          marginRight: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
          borderRadius: SIZES.radius,
          alignItems: "center",
          justifyContent: "center",
          ...styles.shadow,
        }}
        onPress={() => onSelectCategory(item)}
      >
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor:
              selectedCategory?.id === item.id
                ? COLORS.white
                : COLORS.lightGray,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={item.icon}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            marginTop: SIZES.padding,
            color:
              selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
            ...FONTS.body5,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h1 }}>Main</Text>
        <Text style={{ ...FONTS.h1 }}>Categories</Text>
        <FlatList
          style={{ overflow: "visible" }}
          horizontal
          data={categories}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
