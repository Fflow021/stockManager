import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import CustomHeaderStyles from './CustomHeaderStyle/CustomHeaderStyle';

interface HeaderProps {
  title: string;
  imageSource?: ImageSourcePropType;
}

const CustomHeader: React.FC<HeaderProps> = ({ title, imageSource }) => {
  return (
    <View style={CustomHeaderStyles.headerContainer}>
      {imageSource && (
        <Image
          source={imageSource}
          style={CustomHeaderStyles.headerImage}
          resizeMode="contain"
        />
      )}
      <Text style={CustomHeaderStyles.headerText}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
