import { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpense = ({ route, navigation }) => {
   const expensesContext = useContext(ExpensesContext);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState();
   const expenseId = route?.params?.expenseId;
   const selectedExpense = expensesContext.expenses.find(item => item.id === expenseId);

   useLayoutEffect(() => {
      navigation.setOptions({
         title: !!expenseId ? 'Edit Expense' : 'Add Expense'
      });
   }, [navigation, expenseId]);

   async function deleteExpenseHandler() {
      setLoading(true);
      try {
         await deleteExpense(expenseId);
         expensesContext.deleteExpense(expenseId);
         navigation.goBack();
      } catch (error) {
         setError('Could not delete your expense. Please try again later.');
      }
      setLoading(false);
   }

   function cancelHandler() {
      navigation.goBack();
   }

   async function confirmHandler(expenseData) {
      setLoading(true);
      try {
         if (!!expenseId) {
            expensesContext.updateExpense(expenseId, expenseData);
            await updateExpense(expenseId, expenseData);
         } else {
            const id = await storeExpense(expenseData);
            expensesContext.addExpense({ ...expenseData, id });
         }
         navigation.goBack();
      } catch (error) {
         setError('Could not save your data. Please try again later.');
      }
      setLoading(false);
   }

   function errorHandler() {
      setError(null);
   }

   if (error && !loading) {
      return <ErrorOverlay message={error} onConfirm={errorHandler} />;
   }
   if (loading) {
      return <LoadingOverlay />;
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