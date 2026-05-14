const express = require('express');
const router = express.Router();
const { getProvinces, getProvince, getDistricts, getDistrict, getWards } = require('../controllers/province.controller');
const { authenticate } = require('../middlewares/auth');

router.use(authenticate);

router.get('/', getProvinces);
router.get('/:code', getProvince);
router.get('/:code/districts', getDistricts);
router.get('/:code/districts/:districtCode', getDistrict);
router.get('/:code/districts/:districtCode/wards', getWards);

module.exports = router;
