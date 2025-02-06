import record from '../models/record.js';

export const recordAdd=async(req,res)=>
{
    try {

        const{recordId,staffName,taskCompletedDate,taskDescription,cost}=req.body;

        if(!recordId||!staffName||!taskCompletedDate||!taskDescription||!cost)
        {
            return res.status(400).json({
                message:'All fields are required'
            });
        }


        const newRecord=new record({
            recordId,
            staffName,
            taskCompletedDate,
            taskDescription,
            cost
        })
        
        await newRecord.save();

        res.status(201).json({
            message:"Record added successfully",
            record:newRecord,
        })
    } catch (error) {
        res.status(500).json({
            message:"Error adding records" , error:error.message
        })
    }
}

export const recordAll=async(req,res)=>
{
    try {
        const records=await record.find();


        if(!records.length)
        {
              return res.status(404).json(
                {
                    message:'No records found'
                }
               )
        }

      res.status(200).json(records);

        
    } catch (error) {
       return res.status(500).json({
            message:'Error fetching records',
            error:error.message,
            
        })
    }
}

export const recordDelete=async(req,res)=>
{
    try {
        
        const {id}=req.params;
  const deletedRecord=await record.findByIdAndDelete(id);


  if(!deletedRecord)
    {
        return res.status(404).json({message:'record not found'})
    }

    res.json({message:'record deleted successfully',deletedRecord})
    } 
    
    
    catch (error) {
        
        res.status(500).json({message:'error deleting record',error})
    }
  
}