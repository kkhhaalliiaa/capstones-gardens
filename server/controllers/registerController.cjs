const bcrypt = require('bcryptjs');
const connection = require('../config/dbconfig.cjs');

const handleRegister = (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    
    if(!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try{

        const checkDuplicateQuery = 'SELECT email FROM users WHERE email = ?';


        connection.query(checkDuplicateQuery, [email], async (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({ message: 'Server Error' });
            }
            if(results.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const registerQuery = 'INSERT INTO users ( first_name, last_name, email, password_hash, role_id) VALUES ( ?, ?, ?, ?, ?)';

            connection.query(registerQuery, [firstname, lastname, email, hashedPassword, 2], (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({ message: 'Server Error' });
                }
                return res.status(201).json({ message: 'User registered successfully' });
            });
        });

    } catch (err){
        console.log(err);
        return res.status(500).json({ message: 'Server Error' });
    }
    
}

module.exports = {handleRegister};