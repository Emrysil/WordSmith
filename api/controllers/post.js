import {db} from "../db.js"
import jwt  from "jsonwebtoken"
export const getPosts = (req, res) => {
    console.log(req.query)
    let query = ''
    switch (req.query.searchBy) {
        case 'author':
            query = `SELECT * 
            FROM posts P JOIN users U
            ON P.author_id = U.id
            WHERE author_id = (SELECT id FROM users WHERE username='${req.query.keyword}')`
            break;
        case 'title':
            query = `SELECT * 
            FROM posts P JOIN users U
            ON P.author_id = U.id
            WHERE title='${req.query.keyword}'`
            break;
        case 'character':
            query = `SELECT * 
            FROM posts P JOIN users U
            ON P.author_id = U.id
            WHERE main_character='${req.query.keyword}'`
            break;
        default:
            query = `SELECT * FROM posts P, users U WHERE P.author_id = U.id`
            break;
    }
    db.query(query,(err, data) => {
        if(err){
            return res.status(500).json(err)
        } else {
            return res.status(200).json(data)
        }
    })
}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token
    const {author_id, post_id} = req.query
    if(!token) {
        return res.status(401).json("Not Authenticated!")
    }
    jwt.verify(token, "merlin", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid")
        } else if (userInfo.id != author_id) {
            return res.status(403).json("Deletion request denied! You can only delete your posts")
        }
    })
    let query = ''
    switch (req.query.post_id) {
        case -1:
            query = `DELETE FROM posts WHERE author_id = ${author_id}`
        default:
            query = `DELETE FROM posts WHERE post_id = ${post_id}`
    }
    db.query(query, (err, _) => {
        if(err) {
            return res.json(err)
        } else {
            const q = `SELECT * FROM posts WHERE author_id = ${author_id}`
            db.query(q, (err, data) => {
                if(err) {
                    return res.json(err)
                } else {
                    return res.status(200).json(data)
                }
            })
        }
    })
}

export const putPost = (req, res) => {
    console.log("接到上传请求！")
    // use req.body to retrieve the data sent via axios({..., data:{ //information } })
    const {author_id, category, title, main_character, text_content, imageUrl , publish_date} = req.body
    let query = ''
    switch (category) {
        case 'text':
            query = `INSERT INTO posts (author_id, category, title, main_character, text_content, publish_date) 
            VALUES ('${author_id}', '${category}', '${title}', '${main_character}', '${text_content}', '${publish_date}')`
            break;
        case 'picture':
            query = `INSERT INTO posts (author_id, category, title, main_character, imageUrl, publish_date) 
            VALUES ('${author_id}', '${category}', '${title}', '${main_character}', '${imageUrl}', '${publish_date}')`
            break;
        default:
            break;
    }
    console.log(query)
    db.query(query, (err, data) => {
        if(err) {
            console.log("出大问题！")
            return res.status(500).json(err)
        } else {
            console.log(data)
            return res.status(200).json(data)
        }
    })
}
