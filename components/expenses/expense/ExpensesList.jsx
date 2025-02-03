import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const ExpensesList = ({ expenses, refreshData }) => {
    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses).where(eq(Expenses.id, expense.id)).returning();
        if (result) {
            toast("Expense Deleted!")
            refreshData();
        }
    };


    return (
        <div className='mt-3 min-w-[580px]'>
            <h2 className='font-semibold text-xl mb-3'>Latest Expenses</h2>
            <div className='grid grid-cols-4 bg-slate-300 p-2'>
                <h2 className='font-semibold'>Name</h2>
                <h2 className='font-semibold'>Amount</h2>
                <h2 className='font-semibold'>Date</h2>
                <h2 className='font-semibold'>Action</h2>
            </div>
            {
                expenses.map((expense) => (
                    <div key={expense.id} className='grid grid-cols-4 p-2'>
                        <h2>{expense.name}</h2>
                        <h2>{expense.amount}</h2>
                        <h2>{new Date(expense.createdAt).toLocaleDateString()}</h2>
                        <h2>
                            <Trash onClick={() => deleteExpense(expense)} className='text-red-600 cursor-pointer' />
                        </h2>
                    </div>
                ))
            }

        </div>
    );
}

export default ExpensesList;
