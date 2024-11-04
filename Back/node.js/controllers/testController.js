// test모델을 이용해서 get,post방식을 구현하고 db에 테스트하는 라우터를 이용해서 testController.js를 만들어줘
// testController.js
const asyncHandler = require("express-async-handler");
const Test = require('../models/Test');

exports.getTest = async (req, res, next) => {
    try {
        const test = await Test.find();
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching test' });
    }
    }
exports.postTest = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.body);
        const { title, content } = req.body;
        console.log("1");
        const newTest = await Test.create({ title, content, });
        console.log("2");
        res.status(201).json(newTest);
    } catch (error) {
        res.status(500).json({ error: 'Error creating test' });
    }
    });
//