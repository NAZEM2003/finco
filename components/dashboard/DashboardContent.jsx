"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { Budget, Expenses } from '@/utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import CardInfo from './CardInfo';
import DashboardBarChart from './DashboardBarChart';
import BudgetItem from '../budgets/BudgetItem';
import ExpensesList from '../expenses/expense/ExpensesList';

const DashboardContent = () => {
    const [budgetsList, setBudgetList] = useState([]);
    const [expensesList, setExpensesList] = useState([]);

    const { user } = useUser();
    const router = useRouter();

    const fetchBudgets = async () => {
        const result = await db.select({
            ...getTableColumns(Budget),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        })
            .from(Budget)
            .leftJoin(Expenses, eq(Budget.id, Expenses.budgetId))
            .where(eq(Budget.createdBy, user?.primaryEmailAddress.emailAddress))
            .groupBy(Budget.id)
            .orderBy(desc(Budget.id))
        if (result.length === 0 && user) {
            router.push("/dashboard/budgets");
            return
        }
        setBudgetList(result);
        getAllExpenses();
    };

    const getAllExpenses = async () => {
        const result = await db.select({
            id: Expenses.id,
            name: Expenses.name,
            amount: Expenses.amount,
            createdAt: Expenses.createdAt
        }).from(Budget).rightJoin(Expenses, eq(Budget.id, Expenses.budgetId))
            .where(eq(Budget.createdBy, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(Expenses.id));
        setExpensesList(result);
    }

    useEffect(() => {
        user && fetchBudgets();
    }, [user]);

    return (
        <div>
            {
                user ? <>
                    <h2 className='font-bold text-3xl'>Hi , {user?.fullName}</h2>
                    <p className='text-gray-500 mt-2'>here's what happenning with your money , lets manage your expenses</p>
                </>
                    : <>
                        <div className='bg-zinc-300 p-5 w-44 sm:w-72 rounded-lg shadow-lg shadow-zinc-400 animate-puls'></div>

                        <div className='bg-zinc-300 p-3 mt-3 w-full max-w-96 rounded-lg shadow-lg shadow-zinc-400 animate-puls'></div>
                    </>
            }
            <CardInfo budgetsList={budgetsList} />

            <div className='grid grid-cols-1 lg:grid-cols-3 mt-10'>

                <div className='lg:col-span-2 p-2 '>
                    <DashboardBarChart budgetsList={budgetsList} />
                    <div className='overflow-x-scroll'>
                        <ExpensesList expenses={expensesList.slice(0,4)} refreshData={fetchBudgets} />
                    </div>
                </div>

                <div className='mt-10 lg:mt-0 '>
                    <h2 className='text-xl font-semibold mb-5'>Latest Budgets</h2>
                    <div className='grid gap-5'>
                        {
                            budgetsList.slice(0, 3).map((budget, index) => (
                                <BudgetItem key={index} {...budget} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardContent;
