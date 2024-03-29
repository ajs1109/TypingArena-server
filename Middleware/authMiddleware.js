import jwt from 'jsonwebtoken'
import { User } from '../models/UserModel';

const auth =async (req, res,next) => {
    let token;


if(
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
)
{
    try{
        token = req.headers.authorization.split(' ')[1];

        //decodes token id
        const decoded = jwt.verify(token, 'test');
        req.user = await User.findById(decoded.id).select('-password');

        next();

    }
    catch(err){
        res.status(401).json('not authorized')
    }
}
}
export default auth;