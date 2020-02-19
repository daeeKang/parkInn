const router = require('express').Router();
const model = require('../model/Model')

router.post('/AddCompany', (req, res) => {
  console.log(req.body)
    const company = new model.Company({
      companyid: req.body.companyid,
      companyName: req.body.companyName,
    });
  
    company.save().then(res => {
      console.log(res, `company ${req.body.companyid} saved`);
    }).catch(err => {
      console.log(err);
    });
  
    res.status(201).json({
      message: 'Handling post request',
      createdProduct: company
    });
});

module.exports = router;