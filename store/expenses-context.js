import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
   expenses: [],
   setExpenses: (expenses) => { },
   addExpense: ({ description, amount, date }) => { },
   deleteExpense: (id) => { },
   updateExpense: (id, { description, amount, date }) => { }
});

function expensesReducer(state, action) {
   switch (action.type) {
      case 'SET':
         return action.payload.reverse();
      case 'ADD':
         return [action.payload, ...state];
      case 'UPDATE':
         const updatedExpenseIndex = state.findIndex(item => item.id === action.payload.id);
         const updatedExpense = state[updatedExpenseIndex];
         const updatedItem = { ...updatedExpense, ...action.payload.data };
         const updatedExpenses = [...state];
         updatedExpenses[updatedExpenseIndex] = updatedItem;
         return updatedExpenses;
      case 'DELETE':
         return state.filter(item => item.id !== action.payload);
      default:
         return state;
   }
}

function ExpensesContextProvider({ children }) {
   const [expensesState, dispatch] = useReducer(expensesReducer, []);

   function setExpenses(expenses) {
      dispatch({ type: 'SET', payload: expenses });
   }

   function addExpense(expenseData) {
      dispatch({ type: 'ADD', payload: expenseData });
   }

   function deleteExpense(id) {
      dispatch({ type: 'DELETE', payload: id });
   }

   function updateExpense(id, expenseData) {
      dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
   }

   return (
      <ExpensesContext.Provider
         value={{
            expenses: expensesState,
            addExpense: addExpense,
            updateExpense: updateExpense,
            deleteExpense: deleteExpense,
            setExpenses: setExpenses
         }}>
         {children}
      </ExpensesContext.Provider>
   );
}

export default ExpensesContextProvider;