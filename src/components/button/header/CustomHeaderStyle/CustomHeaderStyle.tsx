// styles/HeaderStyles.js
import { StyleSheet } from 'react-native';

const CustomHeaderStyles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#502f5a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#efbd10',
    fontWeight: 'bold',
    marginTop: 10,
  },
  headerImage: {
    width: 60,
    height: 60,
  },
});

export default CustomHeaderStyles;
