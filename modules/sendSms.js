const express = require('express');
const axios = require('axios');

const router = express.Router();


router.post('/', (req, res) => {

  let data = JSON.stringify({
    "senderId": "Nsawan",
    "contacts": req.body.contacts,
    "message": `Thank you for donating to the ${req.body.funeralName}`
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://pagezinc.com/fastapi/v1/send-sms',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.send(response.data)
  })
  .catch((error) => {
    console.log(error.response.data);
    res.status(400).send(error.response.data)
  });

})

module.exports = router

