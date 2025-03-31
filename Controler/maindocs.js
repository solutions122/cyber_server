const Doctor = require("../Model/doc")

const Insert = async(req,res) =>{
    try {
        const {name,email,address,doctorname,contact,fees}=req.body;
        let checkphone = await Doctor.findOne({contact,email})
   if(checkphone){
    console.log("phone  number or email alredy exists try another")
    return res.status(404).json({error:"phone number or email alredy exists"})
   }else{

   const data = await new Doctor({name,email,address,doctorname,contact,whatsappcontact:contact,fees})
   const save = await data.save()
   console.log("Inserted Successfully")
   res.send({"Inserted Successfully":true,save})
   } 
    } catch (error) {
        console.log("Error Occured",error)
    res.status(500).json("some internal error")
    }
}
const View = async(req,res)=>{
    try{
       const data = await Doctor.find()
       console.log(data)
      res.json(data)
   }catch(error){           
        console.log("Error Occured",error)
       res.status(500).json("some internal error")
   }
}

const Delete = async(req,res)=>{
    try {
        let data = await Doctor.findById(req.params.id) 
        if(!data){
            console.log("data is not found")
            return res.status(404).send("data not exists")
        }else{
            data = await Doctor.findByIdAndDelete(req.params.id)
        console.log("data deleted successfully")
        res.json({"success":"sucessfully","deleted data":data})
    }
    } catch (error) {
        console.log("Error Occured",error)
        res.status(500).json("some internal error")
    }   
}
const Update = async(req,res)=>{
    const{name,email,address,doctorname,contact,fees}=req.body;
    try {
        const newdata={}
        if (name)[newdata.name=name]
        if (email)[newdata.email=email]
        if (address)[newdata.address=address]
        if (doctorname)[newdata.doctorname=doctorname]
        if (contact)[newdata.contact=contact]
        if (contact)[newdata.whatsappcontact=contact]
        if (fees)[newdata.fees=fees]
        let data = await Doctor.findById(req.params.id);
        if(!data){
            console.log("data is not found")
        return res.status(404).send("data not exists")
        }else{
            data = await Doctor.findByIdAndUpdate(req.params.id,{$set:newdata})
    console.log("data updated successfully")
    res.json({"success":"sucessfully","updated data":data}) 
        }
    
    } catch (error) {
        console.log("Error Occured",error)
    res.status(500).json("some internal error")
    }
}

module.exports={Insert,View,Delete,Update};