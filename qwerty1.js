const addExpense = async () => {
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.getElementById('currency').value;
    const conversionRate = parseFloat(document.getElementById('conversionRate').value);

    const response = await fetch('/api/expenses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, category, amount, currency, conversionRate })
    });
    if (response.ok) {
        alert("Expense added successfully");
        loadExpenses();
    } else {
        alert("Error adding expense");
    }
};

const loadExpenses = async () => {
    const response = await fetch('/api/expenses');
    const expenses = await response.json();

    const expensesBody = document.getElementById('expensesBody');
    expensesBody.innerHTML = "";

    expenses.forEach(expense => {
        const amountInUSD = (expense.amount * expense.conversionRate).toFixed(2);
        const row = `<tr>
                        <td>${expense.id}</td>
                        <td>${expense.description}</td>
                        <td>${expense.category}</td>
                        <td>${amountInUSD}</td>
                        <td>${expense.currency}</td>
                        <td>${expense.amount}</td>
                        <td>${expense.date}</td>
                     </tr>`;
        expensesBody.insertAdjacentHTML('beforeend', row);
    });
};

// Load expenses on page load
document.addEventListener('DOMContentLoaded', loadExpenses);
