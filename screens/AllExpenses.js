import { useContext, useEffect } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getExpenses } from '../util/http';

const AllExpenses = (props) => {
   const expensesContext = useContext(ExpensesContext);
    useEffect(() => {
      async function loadExpenses() {
         const expenses = await getExpenses();
         expensesContext.setExpenses(expenses);
      }
      loadExpenses();
   }, []);
   return <ExpensesOutput title='Total' expenses={expensesContext.expenses} fallbackText='No expenses listed, try creating one'/>;
};

export default AllExpenses;