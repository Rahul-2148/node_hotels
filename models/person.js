const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username: { type: String, 
                required: true,
                unique: true
    },
    password: { type: String, 
                required: true
    }

});

PersonSchema.pre('save', async function(next) {
        const person = this;

        // Hash the password only if it has been modified (or is new)
        if(!person.isModified('password')) return next(); 
                
        
        try {
             // hash password generation 
             const salt = await bcrypt.genSalt(10);  

             // hash password
             const hashPassword = await bcrypt.hash(person.password, salt);

             // Override the plain password with the hashed one
             person.password = hashPassword;
             next();
        } catch (error) {
            return next(error);
        }
            
});

PersonSchema.methods.comparePassword = async function(candidatePassword) {
        try {
            // Use bcrypt to compare the provided password with the hashed password
            const isMatch = await bcrypt.compare(candidatePassword, this.password);
            return isMatch;

        }catch (error) {
            throw error;    
        }
  
}




// Create the Person model
const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;















// prince -----> bdjeeelknoj2nrbu
// login -----> agrawal

// bdjeeelknoj2nrbu ----> extract salt
// salt + agrawal ---> hash ---> ccvkbebehlccvkbwredlqm

//matlab dono new and old hashed password compare hota h, password match karne ke liye 


