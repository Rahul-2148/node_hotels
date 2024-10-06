const express = require("express");
const router = express.Router();
const Person = require('./../models/person'); // CommonJS
const {jwtAuthMiddleware, generateToken} = require('./../jwt');


// post route to add a person data in the database
router.post('/signup', async (_req, res) => {
    try {
        const data = _req.body; // Assuming the request body contains the personal data

    // create a new person document using the mongoose model
    const newPerson = new Person(data);

    // save the new person to the database
    const response = await newPerson.save();
    console.log('person data saved');
    
    const payload = {
      id: response.id,
      username: response.username
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is : ", token);
    
    res.status(200).json({response: response, token: token});

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
      }
    });

    // Login Route
    router.post('/login', async(req, res) => {
       try{
      // Extract username and password from request body
      const {username, password} = req.body;

      // Find the user by username
      const user = await Person.findOne({username: username});

      // If user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid username or password'});
      }

      // generate Token 
      const payload = {
          id: user.id,
          username: user.username
      }
      const token = generateToken(payload);

      // resturn token as response
      res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

// profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})


    // Get method to get the person data
    router.get('/', jwtAuthMiddleware, async (_req, res) => {
        try {
          const data = await Person.find();
          console.log('person data fetched');
          res.status(200).json(data);
      
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });



      router.get('/:workType', async (_req, res) => {
        try {
          const workType = _req.params.workType; // Extract the work type from the URL parameter
      
          if(workType == 'chef' || workType == 'manager' || workType == 'waiter' || workType == 'owner') {
            const response = await Person.find({work: workType});
            console.log('response feched');
            res.status(200).json(response);
          } else {
            res.status(400).json({ error: 'Invalid work type' });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      })

      // Update method to update the person data
      router.put('/:id', async (_req, res) => {
        try {
          const personid = _req.params.id; // Extract the id from the URL parameter
          const updatedPersonData = _req.body; // Assuming the request body contains the updated personal data
      
          const response = await Person.findByIdAndUpdate(personid, updatedPersonData, { 
            new: true, // Return the updated document
            runValidators: true, // Run mongoose validation
          });

          if (!response) {
            return res.status(404).json({ error: 'Person not found' });
          }
          console.log('data updated');
          res.status(200).json(response);
      
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });

      router.delete('/:id', async (_req, res) => {
        try {
          const personid = _req.params.id; // Extract the person's id from the URL parameter

          // Assuming you have a person modal
          const response = await Person.findByIdAndDelete(personid);
          if (!response) {
            return res.status(404).json({ error: 'Person not found' });
          }
          console.log('data deleted');
          res.status(200).json({ message: 'Person deleted successfully' });
      
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });


      module.exports = router;
