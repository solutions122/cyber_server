const User = require("../Model/Detail")

const Insert = async (req, res) => {
  const { name, age, address, height, weight,   phoneNumber,dateOfBirth  } = req.body;

  if (!name || !age || !address) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    const newUser = new User({ name, age, address,height, weight,   phoneNumber,dateOfBirth });
    await newUser.save();
    res.status(200).send({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error("Error inserting data:", error); // Log the error to the server console
    res.status(500).send({ message: 'Error inserting data', error: error.message });
  }
  };
  
const View = async(req,res)=>{
    try{
       const data = await User.find()
       console.log(data)
      res.json(data)
   }catch(error){           
        console.log("Error Occured",error)
       res.status(500).json("some internal error")
   }
}

const Delete = async(req,res)=>{
    try {
        let data = await User.findById(req.params.id) 
        if(!data){
            console.log("data is not found")
            return res.status(404).send("data not exists")
        }else{
            data = await User.findByIdAndDelete(req.params.id)
        console.log("data deleted successfully")
        res.json({"success":"sucessfully","deleted data":data})
    }
    } catch (error) {
        console.log("Error Occured",error)
        res.status(500).json("some internal error")
    }   
}
const Update = async(req,res)=>{
    const{name,email,address,Username,contact,fees}=req.body;
    try {
        const newdata={}
        if (name)[newdata.name=name]
        if (email)[newdata.email=email]
        if (address)[newdata.address=address]
        if (Username)[newdata.Username=Username]
        if (contact)[newdata.contact=contact]
        if (contact)[newdata.whatsappcontact=contact]
        if (fees)[newdata.fees=fees]
        let data = await User.findById(req.params.id);
        if(!data){
            console.log("data is not found")
        return res.status(404).send("data not exists")
        }else{
            data = await User.findByIdAndUpdate(req.params.id,{$set:newdata})
    console.log("data updated successfully")
    res.json({"success":"sucessfully","updated data":data}) 
        }
    
    } catch (error) {
        console.log("Error Occured",error)
    res.status(500).json("some internal error")
    }
}

module.exports={Insert,View,Delete,Update};