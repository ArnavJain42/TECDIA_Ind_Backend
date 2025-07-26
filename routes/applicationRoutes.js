const express = require('express');
const router = express.Router();
const appCtrl = require('../controllers/applicationController');

const authenticateAdmin = require('../middlewares/authMiddleware'); // adjust path

router.post('/apply', appCtrl.apply);
router.post('/check-status', appCtrl.checkStatus);
// Protect both admin routes
router.get('/admin/all', authenticateAdmin, appCtrl.getAll);
router.patch('/admin/update/:id', authenticateAdmin, appCtrl.updateStatus);

module.exports = router;
