import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import Button from '../UI/Button';
import Input from './Input';

const ExpenseForm = ({ onCancel, onSubmit, submitLabel, defaultValues }) => {
   const [inputs, setInputs] = useState({
      amount: {
         value: defaultValues ? defaultValues.amount.toString() : '',
         isValid: true
      },
      date: {
         value: defaultValues ? getFormattedDate(defaultValues.date) : '',
         isValid: true
      },
      description: {
         value: defaultValues ? defaultValues.description : '',
         isValid: true
      }
   });

   function inputChangeHandler(inputIdentifier, enteredValue) {
      setInputs((currentState) => {
         return {
            ...currentState,
            [inputIdentifier]: { value: enteredValue, isValid: true }
         }
      });
   }

   function submitHandler() {
      const expenseData = {
         amount: +inputs.amount.value,
         date: new Date(inputs.date.value),
         description: inputs.description.value
      };
      const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
      const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
      const descriptionIsValid = expenseData.description.trim().length > 0;
      if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
         return setInputs((currentState) => {
            return {
               amount: { value: currentState.amount.value, isValid: amountIsValid },
               date: { value: currentState.date.value, isValid: dateIsValid },
               description: { value: currentState.description.value, isValid: descriptionIsValid },
            }
         });
      }
      onSubmit(expenseData);
   }

   const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Your Expense</Text>
         <View style={styles.inputsRow}>
            <Input label='Amount'
               style={styles.input}
               invalid={!inputs.amount.isValid}
               textInputConfig={{
                  value: inputs.amount.value,
                  keyboardType: 'decimal-pad',
                  onChangeText: (enteredValue) => inputChangeHandler('amount', enteredValue),
               }}
            />
            <Input label='Date'
               style={styles.input}
               invalid={!inputs.date.isValid}
               textInputConfig={{
                  value: inputs.date.value,
                  placeholder: 'YYYY-MM-DD',
                  maxLength: 10,
                  onChangeText: (enteredValue) => inputChangeHandler('date', enteredValue),
               }}
            />
         </View>
         <Input label='Description'
            invalid={!inputs.description.isValid}
            textInputConfig={{
               value: inputs.description.value,
               multiline: true,
               onChangeText: (enteredValue) => inputChangeHandler('description', enteredValue),
               // autoCapitalize: 'none',
               // autoCorrect: false,
            }}
         />
         {formIsInvalid &&
            <Text style={styles.errorText}>Invalid Input Values - please check your entered Data!</Text>
         }
         <View style={styles.buttonContainer}>
            <Button style={styles.button} mode='flat' onPress={onCancel}>
               Cancel
            </Button>
            <Button style={styles.button} onPress={submitHandler}>
               {submitLabel}
            </Button>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      marginTop: 40
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginVertical: 24
   },
   inputsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   input: {
      flex: 1
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
   },
   button: {
      minWidth: 120,
      marginHorizontal: 8
   },
   errorText: {
      textAlign: 'center',
      color: GlobalStyles.colors.error500,
      margin: 8
   }
});

export default ExpenseForm;