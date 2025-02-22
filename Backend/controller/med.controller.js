const express = require('express');
const asyncHandler = require('express-async-handler');

var medModel = require("../model/med.model");

const base_url = require("../model/base_url");


const allMedInfo = asyncHandler(async (req, res) => {
    try {
        var medData = await medModel.getAllMeds();
        res.status(200).json(medData);
    } catch (error) {
        res.status(403).json(error);
    }
});



const randomMedId = () => "Med-" + Math.floor(Math.random() * 99999) + "-" + Date.now();

const addingMedInfo = asyncHandler(async (req, res) => {
    try {        
        const datatosubmit = {"medicine_id": randomMedId(), "medicine_name": req.body.medicine_name, "medicine_price": req.body.medicine_price, "medicine_composition": req.body.medicine_composition, "used_for":req.body.used_for, 'imagePath': base_url +"/"+ req.file.filename };
        
        const addMedInfo = await medModel.addMed(datatosubmit);
        
        // console.log(addMedInfo);
        
        const message = (addMedInfo.affectedRows) ? "med_insert_success" : "med_insert_error";
        res.status(200).json({ message });
    } catch (error) {
        console.error("Error inserting medicine:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

module.exports = {
    allMedInfo,
    addingMedInfo
};
