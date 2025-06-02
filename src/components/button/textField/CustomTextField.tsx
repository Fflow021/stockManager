// src/components/inputs/TextField.tsx
import React from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import CustomTextFieldStyles from './CustomTextFieldStyle/CustomTextFieldStyle';

interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

export default function CustomTextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
}: TextFieldProps) {
  return (
    <View style={CustomTextFieldStyles.container}>
      <Text style={CustomTextFieldStyles.label}>{label}</Text>
      <TextInput
        style={CustomTextFieldStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}
