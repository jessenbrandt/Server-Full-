let router = require('express').Router();
const Org = require('../db').import('../models/org')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateSession = require('../middleware/validate-session')

router.get('/', (req, res) => ( 
    Org.findAll({
        attributes: ['id','nameOfOrg','location','needs','purpose']
    })
    .then(org => res.status(200).json(org))
    .catch(err => res.status(500).json({ error: err}))
))

router.post('/createOrg', validateSession, (req, res) => {
    Org.create({
        nameOfOrg: req.body.nameOfOrg,
        purpose: req.body.purpose,
        location: req.body.location,
        needs: req.body.needs,
    }).catch(err => {console.log(err)})
        .then(
            createSuccess = (org) => {
                let token = jwt.sign({ id: org.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

                res.json({
                    org: org,
                    message: 'organization created',
                    sessionToken: token
                })
            },
            createError = err => res.send(500, err.message)
        ).catch(err => {console.log(err)})
})

router.get('/:id', (req, res) => {
    Org.findOne({where: {id: req.params.id}})
    .then(org => res.status(200).json(org))
    .catch(err => res.status(500).json({ error: err}))
})

router.put('/:id', validateSession, (req, res) => {
    if (!req.errors) {
        Org.update(req.body,{ where: {id: req.params.id}})
        .then(org => res.status(200).json(org))
        .catch(err => console.log(err))
    } else {
        res.status(500).json(req.errors)
    }
});

router.delete('/:id', validateSession, (req, res) => {
    Org.destroy({where: {id: req.params.id}})
    .then(org => res.status(200).json(org))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;