const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const async = require("hbs/lib/async");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});



exports.register = (req, res) => {

    console.log(req.body);

    //   const name =req.body.name;
    //   const address =req.body.address;
    //   const phone_number=req.body.phone_number;
    //   const dob = req.body.dob;
    //   const college_name = req.body.college_name;
    //   const domain = req.body.domain;
    //   const email = req.body.email;
    //   const password =req.body.password;

    const { name, address, phonenumber, dob, college_name, domain, email, password, passwordconfirm } = req.body;
    // console.log( phone_number);
    console.log( dob );
    console.log( domain);
    db.query('SELECT  email FROM users2 WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);

        }
        if (results.lenght > 0) {
            return res.render('register', {
                message: 'that email is already in use'
            })
        }
         else if (password !== passwordconfirm) {
            return res.render('register', {
                message: 'password do not match '
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);


        // const { name, address, phone_number, dob, college_name, domain, email, password, passwordconfirm } = req.body;

        db.query('INSERT INTO users SET ? ', { name: name, address: address, "college name":college_name, "date of birth":new Date(dob),"phone no": phonenumber, domain:domain, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                console.log("in" + results);
                return res.render('register', {
                    message: 'user registerd'
                }); 
            }
        })

    });




}