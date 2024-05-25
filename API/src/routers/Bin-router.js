const express = require("express");
const Bin = require("../models/bins.js");
const Bin_Data = require("../models/binData.js");
const mongodb = require("mongodb");
const auth = require("../middleware/auth.js");
const apiAuth = require("../middleware/api-auth.js");

const router = express.Router();

router.get("/bindata", auth, function(req, res){
    res.render("bindata", {user: req.session.user});
})

router.get("/bindata/bin", auth, function(req, res){
    res.render("bin", {user: req.session.user});
})

// End point for creating a bin in the system
router.post("/api/bins", apiAuth, async function(req, res){
    req.body.owner = req.session.user._id;
    const bin = new Bin(req.body);

    try{
        await bin.save();
        res.send(bin);
    } catch(error){
        res.send(error);
    }

});

// End point for reading all the bins for a user
router.get("/api/bins", apiAuth, async function(req,res){
    const ownerId = req.session.user._id;
    try{
        const bins = await Bin.find({owner: ownerId});
        res.send(bins);
    }catch(error){
        res.send(error);
    }
})

// End point for reading a specific bin
router.get("/api/bins/:binNumber", apiAuth, async function(req,res){
    const userId = req.session.user._id;

    try{
        const bin = await Bin.findOne({
            binNumber: req.params.binNumber,
            owner: userId 
        });

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);
    } catch(error){
        res.send(error);
    }
});

// End point for updating a bin
router.patch("/api/bins/:binNumber", apiAuth, async function(req,res){
    const userId = req.session.user._id;

    const allowedFields = ["binLocation","compostStatus"];
    const updateFields = Object.keys(req.body);

    const isValid = updateFields.every(function(field){
        return allowedFields.includes(field); // no matter how many trues you have if you have one false then it will return false
    });

    if(!isValid){
        return res.status(400).send({error: "Invalid Update"});
    }

    try{
        const bin = await Bin.findOneAndUpdate({
            binNumber : req.params.binNumber,
            owner: userId},
            req.body, {new: true});

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);

    } catch(error){
        res.send({error: "Something went wrong"});
    }
})

// Endpoint for deleting a  bin
router.delete("/api/bins/:binNumber", apiAuth, async function(req,res){
    try{

        const bin = await Bin.findOneAndDelete({
            binNumber : req.params.binNumber,
            owner: req.session.user._id
        });

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);

        // let result = await Bin_Data.deleteMany({binNumber: req.params.binNumber})


    } catch(error){
        res.send(error);
    }

});

module.exports = router;