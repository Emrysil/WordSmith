import {db} from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    // CHECK EXISTING USER
    const query = `SELECT * FROM users WHERE email = ${req.body.email} OR username = ${req.body.username}`

    db.query(query, (err, data) => {
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("user already exists")

        // HASH THE PASSWORD and CREATE A USER
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        // CREATE SQL QUERY TO INSERT THE USER
        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
        const values = [req.body.username, req.body.email, hash]

        db.query(q, [values], (err, data)=>{
            if(err) return res.json(err)
            return res.status(200).json("user has been created")
        })
    })
}

export const login = (req, res) => {
    const query = `SELECT * FROM users WHERE username = '${req.body.username}'`
    db.query(query, (err, data) => {
        if(err) return res.json(err)
        if(data.length === 0) return res.status(404).json("user not found!")
        // if user exists, check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)
        if(!isPasswordCorrect) {
            res.status(404).json("Wrong username or password")
        } else {
            // login successful, generate token
            const token = jwt.sign({id:data[0].id}, 'merlin',{expiresIn:'1h'})
            const {password, ...other} = data[0]
            res.cookie('access_token',token, {httpOnly:true} ).status(200).json(other)
        }
        
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("user has been logged out")
}