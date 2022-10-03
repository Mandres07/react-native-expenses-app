import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = (props) => {
   const expensesContext = useContext(ExpensesContext);
   const recentExpenses = expensesContext.expenses.filter(item => {
      const today = new Date();
      const lastDate = getDateMinusDays(today, 7);
      return (item.date > lastDate) && (item.date <= today);
   });
   return <ExpensesOutput title='Last 7 days' expenses={recentExpenses} fallbackText='No expenses listed for the last 7 days' />;
};

export default RecentExpenses;