import { createContext, useReducer } from "react";

const DUMMY_DATA = [
   { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2021-12-19') },
   { id: 'e2', description: 'A pair of socks', amount: 9.99, date: new Date('2022-01-05') },
   { id: 'e3', description: 'Some bananas', amount: 0.75, date: new Date('2021-12-03') },
   { id: 'e4', description: 'A book', amount: 19.50, date: new Date('2022-02-25') },
   { id: 'e5', description: 'PS5', amount: 499.99, date: new Date('2022-03-10') }
];

export const ExpensesContext = createContext({
   expenses: [],
   addExpense: ({ description, amount, date }) => { },
   deleteExpense: (id) => { },
   updateExpense: (id, { description, amount, date }) => { }
});

function expensesReducer(state, action) {
   switch (action.type) {
      case 'ADD':
         const id = new Date().toString() + Math.random().toString();
         return [{ ...action.payload, id: id }, ...state];
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
   const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_DATA);

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
            deleteExpense: deleteExpense
         }}>
         {children}
      </ExpensesContext.Provider>
   );
}

export default ExpensesContextProvider;