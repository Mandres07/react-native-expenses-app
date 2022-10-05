import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpense = ({ route, navigation }) => {
   const expensesContext = useContext(ExpensesContext);
   const expenseId = route?.params?.expenseId;

   const selectedExpense = expensesContext.expenses.find(item => item.id === expenseId);

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
   function confirmHandler(expenseData) {
      if (!!expenseId) {
         expensesContext.updateExpense(expenseId, expenseData);
      } else {
         expensesContext.addExpense(expenseData);
      }
      navigation.goBack();
   }

   return (
      <View style={styles.container}>
         <ExpenseForm
            defaultValues={selectedExpense}
            submitLabel={!!expenseId ? 'Update' : 'Add'}
            onSubmit={confirmHandler}
            onCancel={cancelHandler}
         />
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

});

export default ManageExpense;