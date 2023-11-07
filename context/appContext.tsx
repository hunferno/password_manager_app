import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { axiosPostAPI } from "../config/ApiRequestLayout";
import * as SecureStore from "expo-secure-store";

export const AppContext = createContext({});

export const AppProvider = ({ children }: any) => {
  const values = {};
  
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
