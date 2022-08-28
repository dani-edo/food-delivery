import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Animated,
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
import { CurrentLocationType, RestaurantDataType } from "../types/general";

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};
const Restaurant: React.FunctionComponent<Props> = ({ navigation, route }) => {
  const [restaurant, setRestaurant] = useState<RestaurantDataType | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocationType | null>(null);

  useEffect(() => {
    if (route.params) {
      let { item, currentLocation } = route.params;
      setRestaurant(item);
      setCurrentLocation(currentLocation);
    }
  });

  const renderHeader = () => {
    return (
      <View
        style={{
          height: 50,
          flexDirection: "row",
        }}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        {/* Restaurant Name Section */}
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
              paddingHorizontal: SIZES.padding * 3,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
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
            source={icons.list}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
      >
        {restaurant?.menu?.map((item, index) => (
          <View
            key={item.menuId}
            style={{
              height: SIZES.height * 0.35,
              alignItems: "center",
            }}
          >
            {/* Food Image */}
            <Image
              resizeMode="cover"
              source={item.photo}
              style={{ width: SIZES.width, height: "100%" }}
            />

            {/* Quantity */}
            <View style={{ flexDirection: "row", marginTop: -20 }}>
              <TouchableOpacity
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,

                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 25,
                  borderBottomLeftRadius: 25,
                }}
              >
                <Text style={{ ...FONTS.body1 }}>-</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ ...FONTS.h2 }}>5</Text>
              </View>
              <TouchableOpacity
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                }}
              >
                <Text style={{ ...FONTS.body1 }}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Name & Description */}
            <View
              style={{
                width: SIZES.width,
                paddingHorizontal: SIZES.padding * 2,
                alignItems: "center",
              }}
            >
              <Text
                style={{ marginVertical: 10, ...FONTS.h2, textAlign: "center" }}
              >
                {item.name} - {item.price.toFixed(2)}
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "center",
                }}
              >
                {item.description}
              </Text>
            </View>

            {/* Calories */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Image
                source={icons.fire}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />
              <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
                {item.calories.toFixed(2)} cal
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
    </SafeAreaView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
