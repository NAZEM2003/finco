"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Budget } from '@/utils/schema';
import { Loader } from 'lucide-react';
const AddExpense = ({ budgetId, refreshBudget }) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const addExpenseHandler = async () => {
        setIsLoading(true);
        const createdAt = new Date();
        const result = await db.insert(Expenses).values({
            name,
            amount,
            budgetId,
            createdAt
        }).returning({ insertedId: Budget.id });
        if (result) {
            setName("");
            setAmount("");
            toast("New Expense Added");
            refreshBudget();
        }
        setIsLoading(false);
    }

    return (
        <form action={addExpenseHandler} className='border border-zinc-400 rounded-lg p-3'>
            <h2 className='text-xl font-semibold text-center mb-7'>Add Expense</h2>

            <Label className="text-xl mt-7" htmlFor="name">Expense Name</Label>
            <Input
                placeholder="Expense Name..."
                className="mt-2 mb-7"
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <Label className="text-xl" htmlFor="amount">Expense Amount</Label>
            <Input
                placeholder="e.g. Home Decor"
                className="mt-2 mb-8"
                id="amount"
                type="number"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
            />

            <Button disabled={!(name && amount > 0)} className="w-full text-xl" type="submit">
                {
                isLoading ?  <Loader className='animate-spin'/>
                    : "Add New Expense"
                }
            </Button>
        </form>
    );
}

export default AddExpense;
