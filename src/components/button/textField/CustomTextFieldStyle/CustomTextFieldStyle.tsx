import { StyleSheet } from 'react-native';

const CustomTextFieldStyles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  inputError: {
    borderColor: 'red',
  },
});

export default CustomTextFieldStyles;
