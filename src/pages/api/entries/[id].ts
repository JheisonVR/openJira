import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data = 
|{message: string}
| IEntry

export default function handler (req:NextApiRequest , res:NextApiResponse<Data> ){

    const { id } = req.query

    if (!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:'Id no valido'})
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry (req, res)
        case 'GET':
            return getEntryDetail (req, res)
        default: 
            return res.status(400).json({message: 'Metodo no existe'})
    }
}

const updateEntry =async (req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query;
    //const { status } = req.body
    await db.connect();
    const entryToTupdate = await Entry.findById(id)
    if(!entryToTupdate){
        await db.disconnect();
        return res.status(400).json({message:`No hay entradas por el ID: ${id}`})
    }
    
    const {
        description = entryToTupdate.description,
        status = entryToTupdate.status
    } = req.body
    
    try{
        const updateEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new:true});
        await db.disconnect();
        //Las tres siguientes lineas realizan lo mismo que la linea de arriba con el metodo
        // entryToTupdate.description = description;
        // entryToTupdate.status = status
        // await entryToTupdate.save()

        res.status(200).json(updateEntry!)

    }catch(e){
        console.log(e)
        return res.status(400).json({message:'Error en datos ID'})
    }
}

const getEntryDetail =async (req:NextApiRequest, res:NextApiResponse<Data>) => {
    const {id} = req.query;

    await db.connect();
    const entryDetail = await Entry.findById(id);
    await db.disconnect();

    if(!entryDetail){
        await db.disconnect();
        res.status(400).json({message:`Id invalido: ${id}`});
    }

    return res.status(200).json(entryDetail!)
}