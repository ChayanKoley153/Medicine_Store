const { query } = require('express');
var con = require('../model/db.config');

const getAllMeds = () => {
    var myPromise = new Promise((resolve, reject) => {
        var SQL = `select * from medicines`;
        con.query(SQL, (error, medInfo, field) => {
            if (error) return reject(error);
            else return resolve(medInfo);
        });
    })
    return myPromise;
}


const addMed = ({ medicine_id, medicine_name, medicine_price, medicine_composition, used_for, imagePath }) => {
    return new Promise((resolve, reject) => {
        const SQL = `INSERT INTO medicines (medicine_id, medicine_name, medicine_price, medicine_composition, used_for, medicine_image)
                     VALUES ('${medicine_id}', '${medicine_name}', ${medicine_price}, '${medicine_composition}', '${used_for}', '${imagePath}');`;

        con.query(SQL, (error, medInfo) => {
            if (error) return reject(error);
            return resolve(medInfo);
        });
    });
};



module.exports = {
    getAllMeds,
    addMed
}

console.log("medModel is working");