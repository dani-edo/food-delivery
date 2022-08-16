import {
  View,
  Text,
  Image,
  AccessibilityState,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import React, { MouseEvent, ReactNode } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens";
import { COLORS, icons } from "../constants";
import Svg, { Path } from "react-native-svg";

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  const TabBarCustomButton = ({
    accessibilityState,
    children,
    onPress,
  }: {
    accessibilityState?: AccessibilityState;
    children: ReactNode;
    onPress?: (e: GestureResponderEvent | MouseEvent<any>) => void;
  }) => {
    const isFocused = accessibilityState?.selected;
    if (isFocused)
      return (
        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              position: "absolute",
              top: 0,
              flexDirection: "row",
            }}
          >
            <View style={{ backgroundColor: COLORS.white, flex: 1 }}></View>
            <View style={{ marginLeft: -1 }}>
              <Svg width={75} height={61} viewBox="0 0 75 61">
                <Path
                  d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                  fill={COLORS.white}
                />
              </Svg>
            </View>
            <View style={{ backgroundColor: COLORS.white, flex: 1 }}></View>
          </View>
          <TouchableOpacity
            style={{
              top: -22.5,
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: COLORS.white,
            }}
            activeOpacity={1}
            onPress={onPress}
          >
            {children}
          </TouchableOpacity>
        </View>
      );
    else
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            height: 49,
            backgroundColor: COLORS.white,
          }}
          activeOpacity={1}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0, //android
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.cutlery}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.search}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Like"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.like}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.user}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
