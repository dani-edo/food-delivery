import { ImageSourcePropType } from "react-native";

export interface CategoryDataType {
  id: number;
  name: string;
  icon: ImageSourcePropType;
}

export interface RestaurantDataType {
  id: number;
  name: string;
  rating: number;
  categories: number[];
  priceRating: number;
  photo: ImageSourcePropType;
  duration: string;
  location: LocationType;
  courier: Courier;
  menu: Menu[];
}

export interface LocationType {
  latitude: number;
  longitude: number;
}

export interface Courier {
  avatar: any;
  name: string;
}

export interface Menu {
  menuId: number;
  name: string;
  photo: ImageSourcePropType;
  description: string;
  calories: number;
  price: number;
}
