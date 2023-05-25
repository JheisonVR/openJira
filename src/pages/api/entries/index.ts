import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";
import { NewEntry } from '../../../../context/ui/NewEntry';
import { isAwaitExpression } from "typescript";

type Data = 
    | {message: String}
    | IEntry[]
    | IEntry

export default function handler (req:NextApiRequest , res: NextApiResponse<Data> ) {
    switch(req.method){
        case 'GET':
            return getEntries(res)
        case 'POST':
            return postEntry(req, res)
        default: 
            return res.status(400).json({message:'Endpoint no existe'})
    }
}


const getEntries =async (res:NextApiResponse<Data> ) => {

    await db.connect()
    const entries = await Entry.find().sort({createdAt: 'asc'})
    await db.disconnect()

    res.status(200).json(entries)

    
}

const postEntry =async (req:NextApiRequest, res:NextApiResponse<Data> ) => {

    const {description = ''} = req.body
    
    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    });

    try{
        await db.connect();
        await newEntry.save();
        await db.disconnect();
        return res.status(201).json( newEntry )
    }catch(e){
        await db.disconnect();
        console.log(e);
        return res.status(500).json({message:'Algo salio mal'})
    }
}