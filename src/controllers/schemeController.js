import Schemes from '../models/scheme.js'

export const schemeAdd=async(req ,res)=>
{
    try {

        const{id,name,reqDocuments,eligibility,lastDate}=req.body;
        const scheme=new Schemes({
            id,name,reqDocuments,eligibility,lastDate
        })
        await scheme.save();
        res.status(201).json({message:'Scheme added',scheme})
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const schemeAll=async(req,res)=>
{
    try {
        const schemes= await Schemes.find();
        res.status(200).json(schemes);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const schemeDelete=async(req,res)=>
{
    try {
        const schemeDel=await Schemes.findByIdAndDelete(req.params.id);

        if(!schemeDel) return res.status(404).json({
            message:'scheme not found'
        });

        res.status(200).json({message:'scheme deleted successfully'});

        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}