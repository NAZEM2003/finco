import BudgetsContent from '@/components/budgets/BudgetsContent';
import React from 'react';

const Budgets = () => {
    return (
        <main className='p-2 sm:p-10'>
            <h2 className='font-bold text-3xl'>My Budgets</h2>
            <BudgetsContent />
        </main>
    );
}

export default Budgets;
