import { View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const ExpensesOutput = ({ expenses, title, fallbackText }) => {
   if(expenses.length === 0){
      return <View style={styles.container}><Text style={styles.fallback}>{fallbackText}</Text></View>;
   }
   return (
      <View style={styles.container}>
         <ExpensesSummary expenses={expenses} periodName={title} />
         <View style={styles.listContainer}>
            <ExpensesList expenses={expenses} />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: GlobalStyles.colors.primary700,
      paddingBottom: 20
   },
   listContainer: {
      padding: 24
   },
   fallback: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 32,
   }
});

export default ExpensesOutput;