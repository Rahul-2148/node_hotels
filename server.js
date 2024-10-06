const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./Auth');


// use the body parser to parse the request
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
// Define the port number to listen on
const PORT = process.env.PORT || 3000;


// Middleware Function
const logRequest = (req, _res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // Move on to the next phase
};
app.use(logRequest);  


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/' ,(_req, res) => {
  res.send('Welcome to my Hotel...How can I help You ? ');
});


// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuitemRoutes');

// use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(PORT, () => {
  console.log('listening on port 3000');
});


    















// app.post('/person', (_req, res) => {
  
//   const data = _req.body // Assuming the request body contains the personal data

//   // create a new person document using the mongoose model
//   const newPerson = new person(data) // It is efficient to create a new document in the database because if we have many more data's then no need to create multiple documents


//   // this is Un-efficient vast method because it will create multiple documents in the database
//   // const newPerson = new person();
//   // newPerson.name = data.name;
//   // newPerson.age = data.age;
//   // newPerson.work = data.work;
//   // newPerson.mobile = data.mobile;
//   // newPerson.email = data.email;
//   // newPerson.address = data.address;
//   // newPerson.salary = data.salary;

//   // save the new document in the database
//   newPerson.save((error, savedPerson) => {
//     if (error) {
//       console.log('Error on saving persons data:', error);
//       res.status(500).json({ errror: 'Internal server error' });
//     } else {
//           console.log('data saved successfully');
//           res.status(201).json(savedPerson);
//     }
//   });
// }); // This is very very bad way to handle data because here we are not handling any errors and going to next steps.












// app.get('/chicken', (_req, res) => {
//     res.send('sure sir, i would love to serve chicken')
//   })

// app.get('/idli', (_req, res) => {
//     let customized_idli = {
//         name: 'rava idli',
//         size: '10cm diameter',
//         is_sambhar: true,
//         is_chutney: false
//     }
//     res.send(customized_idli)
//   })

// app.post('/person', (_req, res) => {
//     let Student_Information = {
//       "name": "Rahul",
//       "age": "22",
//       "work": "FrontEnd Web Developer",
//       "mobile": "91+ 9973162148",
//       "email": "rahulrajmodi24523@gmail.com",
//       "address": "NSHM KNOWLEDGE CAMPUS, Arrah shibtala Durgapur,West Bengal",
//       "salary": "25000"
//     }
//     res.send(Student_Information)
//   })


//     app.post('/Items', (_req, res) => {
//         let Items = {
//           "name": "Mango Smoothie",
//           "price": "199 rupees",
//           "taste": "Sweet",
//           "is_drink": "true",
//           "ingredients": ["mango", "yogurt", "honey"],
//           "num sales": "45"
//         }
//         res.send(Items)
//       })



    
    
    
  