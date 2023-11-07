import { View, Text } from "react-native";
import { appStyles } from "../../../styles/app/appStyles";
import { identificationStyles } from "../../../styles/app/identificationStyles";
import IdentificationImage from "./IdentificationImage";
import IdentificationInfo from "./IdentificationInfo";
import IdentificationActions from "./IdentificationActions";

const IdentificationItem = ({
  data,
}: {
  data: {
    id: number;
    name: string;
    category: string;
    url: string;
    username: string;
    password: string;
  };
}) => {
  return (
    <View style={identificationStyles.identificationContainer}>
      <IdentificationImage name={data.name} />
      <IdentificationInfo url={data.url} username={data.username} />
      <IdentificationActions password={data.password} />
    </View>
  );
};

export default IdentificationItem;
