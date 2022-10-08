import axios from 'axios';

const baseUrl = 'https://rn-expensesapp-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
   const response = await axios.post(`${baseUrl}/expenses.json`, expenseData);
   return response.data.name;
}

export async function getExpenses() {
   const response = await axios.get(`${baseUrl}/expenses.json`);
   const expenses = [];
   for (const key in response.data) {
      expenses.push({
         id: key,
         amount: response.data[key].amount,
         date: new Date(response.data[key].date),
         description: response.data[key].description,
      });
   }
   return expenses;
}

export function updateExpense(id, expenseData) {
   return axios.put(`${baseUrl}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
   return axios.delete(`${baseUrl}/expenses/${id}.json`);
}
