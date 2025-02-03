import Link from 'next/link';
import React from 'react';

const BudgetItem = ({ icon, name, totalItem, amount, totalSpend, id }) => {
    const calcProgressPercentage = () => {
        const percent = (totalSpend / amount) * 100;
        return percent.toFixed(2);
    }


    return (
        <Link href={`/dashboard/expenses/${id}`} className='p-3 border border-zinc-400 rounded-lg transition-all cursor-pointer shadow-md hover:shadow-zinc-400 sm:minw-72 h-max inline-block'>

            <div className='flex flex-col sm:flex-row items-start justify-between gap-2'>
                <div className='flex items-center gap-2'>
                    <h2 className='text-3xl p-3 bg-slate-100 rounded-full'>{icon}</h2>
                    <div>
                        <h2 className='text-lg font-semibold text-zinc-900'>{name}</h2>
                        <p className='text-gray-500'>{totalItem} Item's</p>
                    </div>
                </div>
                <h2 className='font-semibold text-lg text-primary'>$ {amount}</h2>
            </div>

            <div className='mt-5'>
                <div className='flex items-center justify-between my-1 px-1'>
                    <h2 className='text-sm text-slate-500'>$ {totalSpend ? totalSpend : 0} Spend</h2>
                    <h2 className='text-sm text-slate-500'>$ {amount - totalSpend} Remaining</h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div
                        className={`h-full  bg-primary rounded-full`}
                        style={{
                            width:`${calcProgressPercentage()}%`
                        }}
                    ></div>
                </div>
            </div>

        </Link>
    );
}

export default BudgetItem;
