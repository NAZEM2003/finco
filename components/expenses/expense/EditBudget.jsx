"use client"
import { Button } from '@/components/ui/button';
import { PenBox } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { Budget } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';


const EditBudget = ({ budget , refreshData }) => {
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [emoji, setEmoji] = useState('😊');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState();
    const { user } = useUser();

    useEffect(() => {
        setName(budget?.name);
        setEmoji(budget?.icon);
        setAmount(Number(budget?.amount));
    }, [budget]);

    const updateBudget = async () => {
        const result = await db.update(Budget).set({
            name,
            amount,
            icon: emoji
        }).where(eq(Budget.id, budget.id)).returning();
        if (result) {
            toast("Budget UpDated!");
            refreshData();
        }
    }
    return (
        <div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex items-center gap-2"><PenBox /> Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
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
                                        onChange={(e) => setAmount(Number(e.target.value))} />
                                </div>
                                <Button
                                    onClick={updateBudget}
                                    className="mt-5 w-full"
                                    disabled={!(name && amount)}
                                >Save Changes</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EditBudget;
