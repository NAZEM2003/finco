import React from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const DashboardBarChart = ({ budgetsList }) => {

    return (
        <div className='mb-10'>
            <h2 className='font-semibold text-xl mb-3'>Activity</h2>
            <ResponsiveContainer width={"90%"} height={300}>
                <BarChart
                    data={budgetsList.slice(0, 3)}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalSpend" stackId="a" fill="#7773c7" />
                    <Bar dataKey="amount" stackId="b" fill="#b2b1ee" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default DashboardBarChart;
