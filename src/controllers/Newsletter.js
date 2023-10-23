import Newsletter from "../models/Newsletter.js";

export const getAllNewsletters = async (req, res) =>{
        try{
            const newsletter = await Newsletter.find();
            res.status(200).json(newsletter);
        }
        catch (error){
            res.status(404).json({message: error.message});

        }
    }


export const getNewsletterById = async (req, res) =>{
        const {id} = res.params;
        try{
            const newsletter = await Newsletter.findById(id);
            res.status(200).json(newsletter);
        }
        catch(error){
            res.status(404).json({message: error.message});
        }
    }


export const addNewsletter = async (req , res) => {
    const {name} = req.body 
    try {
        const newNewsletter = new Newsletter({name})
        await newNewsletter.save()
        res.status(200).json(newNewsletter)
    }catch (error) {
        res.status(500).json({error : "error adding newsletter"})
        console.log(error)
    }
}


export const deleteNewsletterById = async (req , res) => {
    const {id}= req.params;
    try{
        const deletedNewsletter = await Newsletter.findByIdAndDelete(id)
        if(!deletedNewsletter){
            return res.status(404).json({message: "Newsletter not found"});
        }
        res.status(200).json({message: `Newsletter deleted successfully`});
    }
    catch(error){
        res.status(404).json({message: error.message});

    }
}
