const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/createuser', (req, res) => {
    User.create({
        firstName: req.body.user.firstname,
        lastName: req.body.user.lastname,
        email: req.body.user.email,
        type: req.body.user.type,
        password: bcrypt.hashSync(req.body.user.password, 10)
    }).catch( err => {
        console.log(err);
    })
        .then(
            createSuccess = (user) => {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

                res.json({
                    user: user,
                    message: 'user created',
                    sessionToken: token
                })
            },  
            createError = err => res.send(500, err.message)
        )
})

router.post('/signin', (req, res) => {
    User.findOne({ where: { email: req.body.user.email } })
        .then(
            user => {
                if (user) {
                    bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                        if (matches) {
                            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

                            res.json({
                                user: user,
                                message: 'successfully authenticated',
                                sessionToken: token
                            })
                        } else {
                            res.status(500).send({error: "failed to authenticate"})
                        }
                    })
                } else {
                    res.status(502).send({error: 'bad gateway'})
                }
            },
            err => res.status(501).send({error: 'failed to process'})
        )
})

module.exports = router