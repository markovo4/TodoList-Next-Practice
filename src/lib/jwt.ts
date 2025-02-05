import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET;

export const generateToken = (payload: {payload:{userId: string}})=>{
    jwt.sign(payload, (SECRET_KEY as string), {expiresIn: '1h'} )
}

export const verifyJWT = (token: string)=>{
    try {
        jwt.verify(token, (SECRET_KEY as string))
    } catch (error) {
        return null;
    }
}