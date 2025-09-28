import userRepository from '../../repositories/user.repository.js'
import bcrypt from "bcrypt";

const saveUser = async (req , res)=>{
    const user = await userRepository.save(req.body);
    return res.status(200);

}

const login = async (req, res) => {
    try {
        const user = await userRepository.getUser(req.body.email);
        if (!user || user.length === 0) return res.sendStatus(404);

        const isMatch = await bcrypt.compare(req.body.password, user[0].password);
        if (!isMatch) return res.sendStatus(401);

        // Kullanıcı bilgisini frontend’e gönder
        const { password, ...userData } = user[0]; // password’u göndermiyoruz
        return res.status(200).json({ user: userData });
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};
export default { saveUser, login };