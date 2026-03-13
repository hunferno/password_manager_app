import type { NavigatorScreenParams } from "@react-navigation/native";
import type { IdentificationType } from "../types/identificationType";
import type { SecureTextType } from "../types/secureTextType";

export type TabParamList = {
  Home: { datas?: IdentificationType[] };
  SecureText: { datas?: SecureTextType[] };
};

export type AppStackParamList = {
  ScreenStack: NavigatorScreenParams<TabParamList>;
  AddIdentifications: { data?: IdentificationType; readOnly?: boolean };
  AddSecureText: {
    data?: SecureTextType & { createdAt?: string; updatedAt?: string };
    readOnly?: boolean;
  };
};
