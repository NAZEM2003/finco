"use client"
import React from 'react';
import BudgetItem from './BudgetItem';

const BudgetsList = ({budgetsList}) => {

    return (
        <>
            {
                budgetsList.length > 0 ? budgetsList.map((budget)=>(
                    <BudgetItem key={budget.id} {...budget}/>
                ))
                
                :[1,2,3,4,5].map((item,index)=>(
                    <div className='h-36 bg-zinc-200 rounded-lg shadow-md shadow-zinc-400 animate-pulse' key={index}> </div>
                ))
            }
        </>
    );
}

export default BudgetsList;
