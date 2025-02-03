"use client"
import React , {useState , useEffect} from 'react';
import BudgetsList from '@/components/budgets/BudgetsList';
import CreateBudgetCard from '@/components/budgets/CreateBudgetCard';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budget, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';


const BudgetsContent = () => {
    const [budgetsList, setBudgetList] = useState([]);
    const { user } = useUser();

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
        setBudgetList(result);
    };
    useEffect(() => {
        user && fetchBudgets();
    }, [user]);
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-12'>
            <CreateBudgetCard fetchBudgets={fetchBudgets} />
            <BudgetsList budgetsList={budgetsList} />
        </div>
    );
}

export default BudgetsContent;
