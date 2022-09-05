import { NavigationAction, RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, {
  AnimatedRegion,
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { SIZES } from "../constants";
import {
  CurrentLocationType,
  Region,
  RestaurantDataType,
} from "../types/general";

type Props = {
  route: RouteProp<{
    params: {
      restaurant?: RestaurantDataType;
      currentLocation?: CurrentLocationType;
    };
  }>;
  navigation: NavigationAction;
};

const OrderDelivery: React.FunctionComponent<Props> = ({
  route,
  navigation,
}) => {
  const [restaurant, setRestaurant] = useState<RestaurantDataType | null>(null);
  const [streetName, setStreetName] = useState("");
  const [fromLocation, setFromLocation] = useState<
    CurrentLocationType["gps"] | null
  >(null);
  const [toLocation, setToLocation] = useState<LatLng | AnimatedRegion>({
    latitude: 0,
    longitude: 0,
  });
  const [region, setRegion] = useState<Region | undefined>(undefined);

  useEffect(() => {
    let { restaurant, currentLocation } = route.params;

    if (restaurant && currentLocation) {
      let fromLoc = currentLocation?.gps;
      let toLoc = restaurant?.location;
      let street = currentLocation?.streetName;

      let mapRegion = {
        latitude: (fromLoc?.latitude + toLoc?.latitude) / 2,
        longitude: (fromLoc?.longitude + toLoc?.longitude) / 2,
        latitudeDelta: Math.abs(fromLoc?.latitude - toLoc?.latitude) * 2,
        longitudeDelta: Math.abs(fromLoc?.longitude - toLoc?.longitude) * 2,
      };

      setRestaurant(restaurant);
      setStreetName(street);
      setFromLocation(fromLoc);
      setToLocation(toLoc);
      setRegion(mapRegion);
    }
  }, []);

  const renderMap = () => {
    const destinationMarker = () => <Marker coordinate={toLocation}>
      
    </Marker>;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
        >
          {destinationMarker()}
        </MapView>
      </View>
    );
  };
  return <View>{renderMap()}</View>;
};

export default OrderDelivery;

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: "#fff",
  },
  map: {
    width: SIZES.width,
    height: SIZES.height,
  },
});
