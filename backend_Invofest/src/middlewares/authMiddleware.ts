import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

// buat fungsi middleware
export const authenticat = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization


    if(!authHeader){
        return res.status(400)
        .json({
                message: "Unauthorized, token tidak ditemukan"
        });
    }

        // dapatkan token
    const token = authHeader.split(" ")[1];


    if (!token) {
        return res.status(401).json({
            message: "Format token tidak valid",
        });
    }

    //jika tokennya ada, maka cocokkan dengan secret key yang ada di .env 
    try {
        // cocokkan pasword yang dikirimkan dengan password yang ada di database
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        (req as any).user = decoded;

        // jika password nya sama maka lanjut ke controller selanjutnya
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Token tidak valid",
        });
    }

}