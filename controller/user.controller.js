const db = require("../models")
const User = db.ticsoft
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!!!"
        })
        return;
    }

    // create user
    const user = {
        FirstName: req.body.givenName,
        LastName: req.body.familyName,
        Email: req.body.email,
        ImageUrl: req.body.imageUrl
    }

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurs"
            })
        })
}

exports.findOne = (req, res) => {
    const email = req.params.Email

    User.findOne({ where: { Email: email } })
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find a user with email=${email}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error retrieving a user with a email=" + email
            })
        })

}

exports.findAll = (req, res) => {

    User.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while retrieving all users."
            })
        })
}

exports.update = (req, res) => {
    const email = req.params.Email

    User.update(req.body, {
            where: { Email: email }
        })
        .then(change => {
            if (change == 1) {
                res.send({
                    message: `The user with email=${email} was updated successfully`
                })
            } else {
                res.send({
                    messsage: `Cannot uptdate the user with email=${email}.Maybe the email was not found or req.body is empty`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating email with email=" + email
            })
        })
}