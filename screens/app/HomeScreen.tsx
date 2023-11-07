import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { appStyles } from "../../styles/app/appStyles";
import { mockDatas } from "../../assets/mockDatas";
import { MaterialIcons } from "@expo/vector-icons";
import EmptyItems from "../../components/app/identification/EmptyItems";
import IdentificationItem from "../../components/app/identification/IdentificationItem";

const HomeScreen = () => {
  const [datas, setDatas] = useState<any>([]);

  useEffect(() => {
    setDatas(mockDatas);
  }, []);

  return (
    <View style={appStyles.container}>
      {Array.isArray(datas) && datas.length > 0 ? (
        datas.map((data: any) => (
          <IdentificationItem key={data.id} data={data} />
        ))
      ) : (
        <EmptyItems />
      )}

      <TouchableOpacity style={appStyles.addBtnContainer}>
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={appStyles.addBtnText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
