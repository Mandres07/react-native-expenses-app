import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpense = ({ route, navigation }) => {
   const expensesContext = useContext(ExpensesContext);
   const expenseId = route?.params?.expenseId;

   useLayoutEffect(() => {
      navigation.setOptions({
         title: !!expenseId ? 'Edit Expense' : 'Add Expense'
      });
   }, [navigation, expenseId]);

   function deleteExpenseHandler() {
      expensesContext.deleteExpense(expenseId);
      navigation.goBack();
   }
   function cancelHandler() {
      navigation.goBack();
   }
   function confirmHandler() {
      if (!!expenseId) {
         expensesContext.updateExpense(expenseId, { description: 'test Updated', amount: 10.99, date: new Date() });
      } else {
         expensesContext.addExpense({ description: 'test', amount: 99.99, date: new Date() });
      }
      navigation.goBack();
   }

   return (
      <View style={styles.container}>
         <View style={styles.buttonContainer}>
            <Button style={styles.button} mode='flat' onPress={cancelHandler}>
               Cancel
            </Button>
            <Button style={styles.button} onPress={confirmHandler}>
               {!!expenseId ? 'Update' : 'Add'}
            </Button>
         </View>
         {!!expenseId && <View style={styles.deleteContainer}>
            <IconButton
               icon='trash'
               color={GlobalStyles.colors.error500}
               size={36}
               onPress={deleteExpenseHandler}
            />
         </View>
         }
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      backgroundColor: GlobalStyles.colors.primary800
   },
   deleteContainer: {
      marginTop: 16,
      paddingTop: 8,
      borderTopWidth: 2,
      borderTopColor: GlobalStyles.colors.primary200,
      alignItems: 'center'
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   },
   button: {
      minWidth: 120,
      marginHorizontal: 8
   }
});

export default ManageExpense;