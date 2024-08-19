const express = require('express');

const router = express.Router();

router.use(express.json());

router.route('/:userId/recipes/create').post((req, res) => {
    res.json({
        success: true,
        statusCode: res.statusCode,
        requestType: 'POST'
    });
});

module.exports = router;