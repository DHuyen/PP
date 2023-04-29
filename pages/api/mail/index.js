import connectDB from '../../../utils/connectDB'
import Mail from '../../../models/mailModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await createMail(req, res)
            break;
        case "GET":
            await getMail(req, res)
            break;
    }
}

const createMail = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'user')
        return res.status(400).json({err: "Authentication is not valid."})

        const { user_name, email, subject, message } = req.body
        if(user_name?.lengt) return res.status(400).json({err: "The name field cannot be left blank."})

        const newMail = new Mail({user_name, email, subject, message})

        await newMail.save()
        res.json({
            msg: 'Your message has been successfully sent.',
            newMail
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const getMail = async (req, res) => {
    try {
        const mail = await Mail.find()

        res.json({mail})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}