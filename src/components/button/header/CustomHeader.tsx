// components/Header.js
// components/Header.tsx
import React from 'react';
import { View, Text, Image,ImageSourcePropType } from 'react-native';
import CustomHeaderStyles from '../../../styles/CustomButtonStyle/CustomHeaderStyle';

interface HeaderProps {
  title: string;
  imageSource?: ImageSourcePropType;
}

const CustomHeader: React.FC<HeaderProps> = ({ title, imageSource }) => {
  return (
    <View style={CustomHeaderStyles.headerContainer}>
      {imageSource && (
        <Image source={imageSource} style={CustomHeaderStyles.headerImage} resizeMode="contain" />
      )}
      <Text style={CustomHeaderStyles.headerText}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
