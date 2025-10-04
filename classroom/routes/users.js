const express = require('express');
const router = express.Router();









router.get('/', (req, res)=>{
    res.send("root ");
})

router.get('/:id', (req, res)=>{
    res.send("this user id");
})

//post

router.post('/', (req, res)=>{
    res.send("add ");
})

router.delete('/:id', (req, res)=>{
    res.send("delete ");
})


module.exports = router;

