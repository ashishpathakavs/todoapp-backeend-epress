import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

const router = express.Router();

// Register a user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    try {
        // save the new user
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        // save the default todo for the new user
        const defaultTodo = `Hello!, Add your first todo!`;
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id,
            },
        });

        // generate a token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ token });
    } catch (error) {
        res.status(503).json({ error: error.message });
    }
}
);

// Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try{
        const user  = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        
        if(!user){
           return res.status(404).send({message: 'User not found'});
        }
        
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({message: "Invalid password"}); 
        }

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );
        res.status(200).json({token}); 
    }
    catch(error){
        res.status(503).json({error: error.message});
    }
})
 

export default router;