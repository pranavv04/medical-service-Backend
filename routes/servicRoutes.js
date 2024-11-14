const express = require('express');
const router = express.Router();
const Service = require('../model/Service')
const {body , validationResult} = require('express-validator')


router.post(
    '/addservice',
    [
      body('serviceName').notEmpty().withMessage('Service name is required').isString().withMessage('Service name must be a string'),
      body('description').optional().isString().withMessage('Description must be a string'),
      body('price').notEmpty().withMessage('Price is required').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    ],
    async (req, res) => {
        
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const data = req.body;
        const newService = new Service(data);
        const response = await newService.save();
        console.log('New Service ADDED');
        res.status(200).json(response);
      } catch (error) {
        console.log('Internal server error');
        res.status(500).json({ message: 'Internal Server error' });
      }
    }
  );
  

router.get('/getservices' , async(req,res)=>{
    try {
        const data = await Service.find();
        console.log('All data fetched');
        res.status(200).json(data);
        
    } catch (error) {
        console.log('Internal server error');
        res.status(500).json({message : "Internal Server error"})
    }
})

router.get('/:id' , async(req,res)=>{
    try {
        const serviceId = req.params.id;
        if(serviceId){
            const response = await Service.findById(serviceId);
            if(!response){
                return res.status(404).json({error:"Service not found"})
            }
            console.log('Data fetched')
            res.status(200).json(response);
        }
    } catch (error) {
        console.log('Internal server error');
        res.status(500).json({message : "Internal server error"})
        
    }
})

router.put(
    '/updateservice/:id',
    [
      body('serviceName').optional().isString().withMessage('Service name must be a string'),
      body('description').optional().isString().withMessage('Description must be a string'),
      body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const serviceId = req.params.id;
        const updatedData = req.body;
  
        const response = await Service.findByIdAndUpdate(serviceId, updatedData, {
          new: true,
          runValidators: true,
        });
  
        if (!response) return res.status(404).json({ error: 'Service update failed' });
        console.log('Service update successful');
        res.status(200).json(response);
      } catch (error) {
        console.log('Internal server error');
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  );
  

router.delete('/deleteservice/:id' , async(req,res)=>{
    try {
        const serviceId = req.params.id;
    const response = await Service.findByIdAndDelete(serviceId);
      if(!response){
        return res.status(404).json({error : "Service deletion failed"})
       }
       console.log('Service deleted');
       res.status(200).json(response)
    } catch (error) {
        console.log('Internal  server error')
        res.status(500).json({message : "Internal server error"})
    }
})

module.exports = router;
