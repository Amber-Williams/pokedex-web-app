const express = require('express');
const app = express();
const port = 4000;

app.get('/test', (req, res) => { 
  // console.log('req', req)
  // console.log('res', res)

  res.json(1233)
})


app.listen(port, () => console.log(`BE Server listening on ${port}`))