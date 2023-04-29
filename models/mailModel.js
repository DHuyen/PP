import mongoose from 'mongoose'

const MailSchema = new mongoose.Schema({
    user_name: String,
    email: String,
    subject: String,
    message: String,
}, {
    timestamps: true
})

let Dataset = mongoose.models.mail || mongoose.model('mail', MailSchema)
export default Dataset