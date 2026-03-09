import type { NavigatorScreenParams } from "@react-navigation/native";
import type { IdentificationType } from "../types/identificationType";
import type { SecureTextType } from "../types/secureTextType";

export type TabParamList = {
  Home: { datas?: IdentificationType[] };
  SecureText: undefined;
};

export type AppStackParamList = {
  ScreenStack: NavigatorScreenParams<TabParamList>;
  AddIdentifications: { data?: IdentificationType; readOnly?: boolean };
  AddSecureText: {
    data?: SecureTextType & { createdAt?: string; updatedAt?: string };
    readOnly?: boolean;
  };
};
