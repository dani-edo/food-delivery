import { NavigationProp } from "@react-navigation/native";
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
import { CategoryDataType, RestaurantDataType } from "../types/general";

type Props = {
  navigation: NavigationProp<any>;
};

const Home: React.FunctionComponent<Props> = ({ navigation }) => {
  const [categories, setCategories] =
    useState<CategoryDataType[]>(categoryData);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryDataType | null>(null);
  const [restaurants, setRestaurants] =
    useState<RestaurantDataType[]>(restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation
  );

  const onSelectCategory = (item: CategoryDataType) => {
    // filter restaurant
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(item.id)
    );

    setRestaurants(restaurantList);
    setSelectedCategory(item);
  };

  const getCategoryNameById = (id: number) => {
    const category = categories.filter((e) => e.id === id);
    if (category) return category[0].name;
    return "";
  };

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

  const renderRestaurantList = () => {
    const renderItem = ({ item }: { item: RestaurantDataType }) => (
      <TouchableOpacity
        style={{ marginBottom: SIZES.padding * 2 }}
        onPress={() => navigation.navigate("Restaurant", {
          item,
          currentLocation
        })}
      >
        {/* Image */}
        <View style={{ marginBottom: SIZES.padding * 2 }}>
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />
          <View
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: "white",
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
          </View>
        </View>

        {/* Restaurant Info */}
        <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
          }}
        >
          {/* Rating */}
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

          {/* Cetagories */}
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
          >
            {item.categories.map((categoryId) => (
              <View key={categoryId} style={{ flexDirection: "row" }}>
                <Text style={{ ...FONTS.body3 }}>
                  {getCategoryNameById(categoryId)}
                </Text>
                <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
              </View>
            ))}
          </View>

          {/* Price */}
          {[1, 2, 3].map((priceRating) => (
            <Text
              key={priceRating}
              style={{
                ...FONTS.body3,
                color:
                  priceRating <= item.priceRating
                    ? COLORS.black
                    : COLORS.darkgray,
              }}
            >
              $
            </Text>
          ))}
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
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
