const mongoose = require('mongoose');

// Define the Person schema
const PersonSchema = new mongoose.Schema({
    name: { type: String, 
            required: true 
    },
    age: { type: Number, 
          required: true 
    },
    work: { type: String,
            enum: ['chef', 'waiter', 'manager', 'owner'], 
            required: true 
    },
    mobile: { type: String, 
              required: true 
    },
    email: { type: String, 
             required: true,
             unique: true
    },
    address: { type: String,        
    },
    salary: { type: Number, 
              required: true 
    }
});

// Create the Person model
const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;


