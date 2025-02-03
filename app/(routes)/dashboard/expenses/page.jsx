import ExpensesContent from '@/components/expenses/ExpensesContent';
import React from 'react';

const Expenses = () => {
    return (
        <main className='p-2 py-7 sm:p-10'>
            <h2 className='font-bold text-3xl'>My Expenses</h2>
            <ExpensesContent/>
        </main>
    );
}

export default Expenses;
