import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const LoadingOverlay = (props) => {
   return (
      <View style={styles.container}>
         <ActivityIndicator size='large' color='white' />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      backgroundColor: GlobalStyles.colors.primary700
   }
});

export default LoadingOverlay;