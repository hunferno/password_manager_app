import { View, Text } from 'react-native'
import React from 'react'
import { SecureTextType } from '../../../types/secureTextType';

const SecureTextItem = ({
    data
}: {
    data: SecureTextType;
}) => {
  return (
    <View>
      <Text>SecureTextItem</Text>
    </View>
  )
}

export default SecureTextItem