"use client"
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"
import { db } from '@/utils/dbConfig';
import { Budget } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { toast } from "sonner"
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import EmojiPicker from 'emoji-picker-react';

const CreateBudgetCard = ({fetchBudgets}) => {
    const [emoji, setEmoji] = useState('😊');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const { user } = useUser();

    const createBudget = async () => {
        const result = await db.insert(Budget).values({
            name,
            amount,
            createdBy: user?.primaryEmailAddress.emailAddress,
            icon: emoji
        }).returning({ isertedId: Budget.id });
        if (result) {
            fetchBudgets();
            toast("New Budget Created!");
            setAmount("");
            setName("");
            setEmoji('😊');
        }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='p-5 bg-slate-100 rounded-md flex flex-col items-center border-2 border-dashed border-zinc-300 cursor-pointer hover:shadow-md shadow-zinc-300'>
                        <h2 className='text-3xl'>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            <div>
                                <div>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={() => setOpenEmojiPicker(prevState => !prevState)}
                                    >{emoji}</Button>
                                    <div className='absolute z-10 left-20 -top-24'>
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setEmoji(e.emoji)
                                                setOpenEmojiPicker(false)
                                            }}
                                            open={openEmojiPicker}
                                        />
                                    </div>
                                </div>
                                <div className='mt-7'>
                                    <Label className="text-xl" htmlFor="name">Budget Name</Label>
                                    <Input
                                        placeholder="e.g. Home Decor"
                                        className="my-2"
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='mt-7'>
                                    <Label className="text-xl" htmlFor="amount">Budget Amount</Label>
                                    <Input
                                        placeholder="e.g. 5000"
                                        className="my-2"
                                        id="amount"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)} />
                                </div>
                                <Button
                                    onClick={createBudget}
                                    className="mt-5 w-full"
                                    disabled={!(name && amount)}
                                >Create Budget</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default CreateBudgetCard;
