import express from 'express'
import postRoute from './routes/post.js'
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import cookieParser from 'cookie-parser'
import multer from 'multer'

const app = express()

app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/publications')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({storage})

app.post('/api/upload', upload.single('image'), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})

app.use("/api/post", postRoute)
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)

app.listen(2333, () => {
    console.log('connected!!!!!')
})