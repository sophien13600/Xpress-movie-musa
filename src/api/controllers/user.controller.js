import userRepository from '../../repositories/user.repository.js'
import bcrypt from "bcrypt";

const saveUser = async (req , res)=>{
    const user = await userRepository.save();
    return res.status(200);

}

const login =  async(req, res)=>{
    const user = await userRepository.getUser(req.body.email);
     try {
            if (await bcrypt.compare(req.body.password, user[0].password)) {
                return res
                    .sendStatus(200)
                    
            }
     } catch (res) {
         return   res
             .sendStatus(404)
}
}
export default { saveUser, login };