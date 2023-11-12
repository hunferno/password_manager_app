import { TouchableOpacity, View } from "react-native";
import { identificationStyles } from "../../../styles/app/identificationStyles";
import IdentificationImage from "./IdentificationImage";
import IdentificationInfo from "./IdentificationInfo";
import IdentificationActions from "./IdentificationActions";

import { useCallback, useRef, useState } from "react";
import { IdentificationType } from "../../../types/identificationType";

const IdentificationItem = ({
  data,
  handleActionModal,
  setSelectedItem,
}: {
  data: IdentificationType;
  handleActionModal: any;
  setSelectedItem: any;
}) => {
  return (
    <View style={identificationStyles.identificationContainer}>
      <View style={{ flexDirection: "row" }}>
        <IdentificationImage name={data.name} />
        <IdentificationInfo url={data.url} username={data.username} />
      </View>
      <IdentificationActions
        data={data}
        handleActionModal={handleActionModal}
        setSelectedItem={setSelectedItem}
      />
    </View>
  );
};

export default IdentificationItem;
