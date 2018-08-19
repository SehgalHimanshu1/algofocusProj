const express = require('express');
const router = express.Router();
const mainCtrl = require('../controllers/main');

/* GET home page. */
router.get('/', mainCtrl.home);

/* GET user-form page */
router.get('/user-form', mainCtrl.form);
router.post('/save-form', mainCtrl.formSave);

module.exports = router;
