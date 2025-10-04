const express = require('express');
const router = express.Router();






router.get('/', (req, res)=>{
    res.send("this is root");
})

router.get('/:id', (req, res)=>{
    res.send("this user id");
})

//post

router.post('/', (req, res)=>{
    res.send("add users");
})

router.delete('/:id', (req, res)=>{
    res.send("delete users");
})

module.exports = router;