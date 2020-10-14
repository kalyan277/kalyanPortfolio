const express = require('express');
const router = express.Router();


const DialogFlowCtrl = require('../controllers/dialogFlow');

router.post(
  "/event", DialogFlowCtrl.eventDialog
);
router.post('',DialogFlowCtrl.postDialog);
module.exports = router;