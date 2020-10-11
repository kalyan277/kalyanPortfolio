const express =require('express');
const router =express.Router();
const authServices = require("../services/auth");

const PortfolioCtrl = require('../controllers/portfolio');

router.post('',authServices.checkJWT,authServices.checkRole('siteOwner'), PortfolioCtrl.savePortfolio);

router.get('',PortfolioCtrl.getPortfolios);

router.patch(
  "/:id",
  authServices.checkJWT,
  authServices.checkRole("siteOwner"),
  PortfolioCtrl.updatePortfolio
);

router.delete(
  "/:id",
  authServices.checkJWT,
  authServices.checkRole("siteOwner"),
  PortfolioCtrl.deletePortfolio
);
router.get("/:id", PortfolioCtrl.getPortfolioById);

router.patch(
  "/:id",
  authServices.checkJWT,
  authServices.checkRole("siteOwner"),
  PortfolioCtrl.updatePortfolio
);


module.exports =router;