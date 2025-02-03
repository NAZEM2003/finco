import ExpenseContent from '@/components/expenses/expense/ExpenseContent';
import React from 'react';

const Expense = ({ params }) => {
    const id = params.id;
    return (
        <main className='p-2 py-7 sm:p-10'>
            <ExpenseContent budgetId={id}/>
        </main>
    );
}

export default Expense;
