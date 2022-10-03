import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = (props) => {
   const expensesContext = useContext(ExpensesContext);
   return <ExpensesOutput title='Total' expenses={expensesContext.expenses} fallbackText='No expenses listed, try creating one'/>;
};

export default AllExpenses;