"use client"
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const CardInfo = ({ budgetsList }) => {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
        let totalBudgetsAmount = 0;
        let totalSpends = 0;
        budgetsList.forEach(budget => {
            totalBudgetsAmount += Number(budget.amount);
            totalSpends += Number(budget.totalSpend);
        });
        setTotalBudget(totalBudgetsAmount);
        setTotalSpend(totalSpends);
    }, [budgetsList]);
    
    return (
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                budgetsList.length > 0 ? <>
                    <div className='p-7 border border-zinc-300 rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='mb-2 text-zinc-700 font-semibold'>Total Budget</h2>
                            <h2 className='font-bold text-2xl'>$ {totalBudget}</h2>
                        </div>
                        <PiggyBank className='w-10 h-10 p-1 bg-primary text-white rounded-full' />
                    </div>

                    <div className='p-7 border border-zinc-300 rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='mb-2 text-zinc-700 font-semibold'>Total Spend</h2>
                            <h2 className='font-bold text-2xl'>$ {totalSpend}</h2>
                        </div>
                        <ReceiptText className='w-10 h-10 p-1 bg-primary text-white rounded-full' />
                    </div>

                    <div className='p-7 border border-zinc-300 rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='mb-2 text-zinc-700 font-semibold'>No. of Budget</h2>
                            <h2 className='font-bold text-2xl'>{budgetsList?.length}</h2>
                        </div>
                        <Wallet className='w-10 h-10 p-1 bg-primary text-white rounded-full' />
                    </div>
                </> : <>
                    {
                        [1, 2, 3].map(item => <div key={item} className='bg-zinc-300  h-32 rounded-lg shadow-lg shadow-zinc-400 animate-pulse'>

                        </div>)
                    }
                </>
            }
        </div>
    );
}

export default CardInfo;
