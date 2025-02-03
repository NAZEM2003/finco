import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ExpenseCard = ({ id, icon, name, amount,totalSpend }) => {
    const [expenses, setExpenses] = useState([]);

    const getExpenses = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, id))
            .orderBy(desc(Expenses.id))
        if (result) {
            setExpenses(result)
        }
    }

    useEffect(() => {
        getExpenses();
    }, [id]);



    return (
        <Link href={`/dashboard/expenses/${id}`} className='p-3 w-full max-w-2xl border border-zinc-400 rounded-lg transition-all cursor-pointer shadow-md hover:shadow-zinc-400 h-max inline-block'>
            <div className='sm:flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <h2 className='text-xl sm:text-3xl'>{icon} </h2>
                    <h2 className='text-lg sm:text-xl font-bold'>{name}</h2>
                </div>
                <h2 className='text-lg font-semibold text-zinc-500 mt-3 sm:mt-0'>
                    Total Amount :
                    <span className='text-primary ml-2'>$ {amount}</span>
                </h2>
            </div>
            <div className='grid grid-cols-1 mt-5 gap-4'>
                {
                    expenses.length > 0 ? <>
                    {
                        expenses.map((expense, index) => (
                                <div className='bg-zinc-300 rounded-md p-2 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between' key={expense.id}>
                                    <h2 className='flex items-center gap-2 text-lg font-semibold'>
                                        <span className='w-6 h-6 flex items-center justify-center rounded-full border border-zinc-400 text-base font-normal text-zinc-700'>
                                            {index + 1}
                                        </span>
                                        {expense.name}
                                    </h2>
                                    <p className='text-lg mt-3 sm:mt-0 font-semibold text-primary'>
                                        $ {expense.amount}
                                    </p>
                                </div>
                        )) 
                    }
                    <div className='flex justify-between items-center flex-wrap gap-5'>
                        <p className='w-max text-lg font-bold text-zinc-600'>Spend : ${totalSpend}</p>
                        <p className='w-max text-lg font-bold text-zinc-600'>Remaining : ${amount - totalSpend}</p>
                    </div>
                    </>
                        : <div className='flex flex-col items-center'>
                            <h2 className='text-lg sm:text-xl font-semibold text-center mt-8'>There is no Expense!</h2>
                            <Link className='mt-3 p-3 bg-primary text-white rounded-lg' href={`/dashboard/expenses/${id}`}>Add New Expense</Link>
                        </div>
                }
            </div>
        </Link>
    );
}

export default ExpenseCard;
