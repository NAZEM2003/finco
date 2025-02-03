"use client"
import BudgetItem from '@/components/budgets/BudgetItem';
import { db } from '@/utils/dbConfig';
import { Budget, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import AddExpense from './AddExpense';
import ExpensesList from './ExpensesList';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import EditBudget from './EditBudget';


const ExpenseContent = ({ budgetId }) => {
    const [budget, setBudget] = useState()
    const [expenses, setExpenses] = useState([]);
    const { user } = useUser();
    const router = useRouter();
    
    const getLatestExpenses = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, budgetId))
            .orderBy(desc(Expenses.id))
        if (result) {
            setExpenses(result)
        }
    };

    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budget),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        })
            .from(Budget)
            .leftJoin(Expenses, eq(Budget.id, Expenses.budgetId))
            .where(eq(Budget.createdBy, user?.primaryEmailAddress.emailAddress))
            .where(eq(Budget.id, budgetId))
            .groupBy(Budget.id);
        setBudget(result[0]);
        getLatestExpenses();
    };

    const deleteBudget = async () => {
        const deleteExpensesResult = await db.delete(Expenses).where(eq(Expenses.budgetId, budgetId)).returning();
        const result = await db.delete(Budget).where(eq(Budget.id, budgetId)).returning();

        if (result) {
            toast("Budget Deleted!");
            router.replace("/dashboard/budgets")
        }
    }

    useEffect(() => {
        user && getBudgetInfo();
    }, [user])

    return (
        <div>
            <div className='flex items-center flex-wrap gap-5 justify-between'>
                <h2 className='font-bold text-3xl'>My Expenses</h2>
                <div className='flex items-center gap-5'>
                   <EditBudget refreshData={getBudgetInfo} budget={budget}/>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="flex items-center " variant="destructive"> <Trash /> Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your current budget along with expenses.and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteBudget}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 mt-10 gap-4'>
                {
                    budget ? <BudgetItem {...budget} />
                        : <div className='h-36 bg-zinc-200 rounded-lg shadow-md shadow-zinc-400 animate-pulse'> </div>
                }

                <AddExpense refreshBudget={getBudgetInfo} budgetId={budgetId} />
            </div>
            <div className='mt-8 border border-zinc-300 rounded-md p-2 shadow-md shadow-zinc-400 overflow-x-scroll'>
                {
                    expenses.length > 0 ? <ExpensesList refreshData={getBudgetInfo} expenses={expenses} />
                        : <h2 className='text-2xl font-bold text-center mt-10 p-3'>There is no Expense!</h2>
                }
            </div>
        </div>
    );
}

export default ExpenseContent;
