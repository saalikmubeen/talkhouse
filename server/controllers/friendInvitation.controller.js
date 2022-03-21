

const inviteFriend = (req, res) => {

    const {email} = req.body
    res.send(email)
}


module.exports = {
    inviteFriend
}