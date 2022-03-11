const express = require('express');
const router = express.Router();
const csvtojson = require('csvtojson');

const User = require('../models/User');
const excelJS = require('exceljs');
const data = require('../server')


//add single user
router.post('/addUser', async (req, res) => {
    const newUser = new User(req.body)
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})


//add all users through csv
router.post('/upload', (req, res) => {

    csvtojson()
        .fromFile('./files/users.csv')
        .then((jsonObj) => {

            console.log(jsonObj);
            User.insertMany(jsonObj, (err, data) => {

                if (err) {
                    res.status(400).json("Something went wrong");
                    console.log(err);
                } else {
                    res.status(200).json({
                        message: "File Uploaded Successfully",
                        result: data
                    });
                }
            })
        })
})


//generate excel file of collection
router.get('/getExcel', (req, res) => {
    const workbook = new excelJS.Workbook();

    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
        { header: "S.no.", key: "s_no", width: 10 },
        { header: "firstName", key: "f_name", width: 15 },
        { header: "lastName", key: "l_name", width: 15 },
        { header: "email", key: "email", width: 15 },
        { header: "phoneNo", key: "ph_no", width: 15 },
        { header: "address", key: "address", width: 15 },
        { header: "gender", key: "gender", width: 15 },
        { header: "dob", key: "d.o.b.", width: 15 },
        { header: "create_date", key: "date", width: 15 },
    ];

    // worksheet.addRows(data);

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true }
    });

    workbook.xlsx.writeFile("users.xlsx")
        .then(function () {
            console.log("file is saved");
        })
        .catch(function (err) {
            console.log(err)
        })
})

module.exports = router;