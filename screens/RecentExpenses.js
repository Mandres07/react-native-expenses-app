import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { getExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = (props) => {
   const expensesContext = useContext(ExpensesContext);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState();

   useEffect(() => {
      async function loadExpenses() {
         setLoading(true);
         try {
            const expenses = await getExpenses();
            expensesContext.setExpenses(expenses);
         } catch (error) {
            setError('Could not fetch your expenses.');
         }
         setLoading(false);
      }
      loadExpenses();
   }, []);

   function errorHandler() {
      setError(null);
   }

   if (error && !loading) {
      return <ErrorOverlay message={error} onConfirm={errorHandler} />;
   }
   if (loading) {
      return <LoadingOverlay />;
   }

   const recentExpenses = expensesContext.expenses.filter(item => {
      const today = new Date();
      const lastDate = getDateMinusDays(today, 7);
      return (item.date > lastDate) && (item.date <= today);
   });

   return <ExpensesOutput title='Last 7 days' expenses={recentExpenses} fallbackText='No expenses listed for the last 7 days' />;
};

export default RecentExpenses;