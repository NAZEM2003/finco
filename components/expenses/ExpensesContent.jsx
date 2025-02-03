"use client"
import { db } from '@/utils/dbConfig';
import { Budget, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import ExpenseCard from './ExpenseCard';

const ExpensesContent = () => {
    const { user } = useUser();
    const [budgets, setBugets] = useState([]);

    const fetchBudgets = async () => {
        const result = await db.select({
            ...getTableColumns(Budget),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        })
            .from(Budget)
            .leftJoin(Expenses, eq(Budget.id, Expenses.budgetId))
            .where(eq(Budget.createdBy, user?.primaryEmailAddress.emailAddress))
            .groupBy(Budget.id)
            .orderBy(desc(Budget.id))

        setBugets(result);

    };

    useEffect(() => {
        user && fetchBudgets();
    }, [user]);

    return (
        <div className='flex flex-col mt-12 gap-5'>
            {
               budgets.length > 0 ?
                    budgets.map(budget => <ExpenseCard key={budget.id} {...budget} />)
                    : [1, 2, 3].map(item => <div
                        key={item}
                        className='p-3 w-full max-w-2xl bg-zinc-300 animate-pulse border border-zinc-300 rounded-lg shadow-md shadow-zinc-400 h-40'>
                

                    </div>)
            }
        </div>
    );
}

export default ExpensesContent;
