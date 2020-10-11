const express = require("express");
const router = express.Router();
const authServices = require("../services/auth");

const BlogCtrl = require("../controllers/blog");

router.post(
  "",
  authServices.checkJWT,
  authServices.checkRole("siteOwner"),
  BlogCtrl.createBlog
);

router.patch(
  "/:id",
  authServices.checkJWT,
  authServices.checkRole("siteOwner"),
  BlogCtrl.updateBlog
);
router.get("/s/:slug", BlogCtrl.getBlogBySlug);

router.get("", BlogCtrl.getBlog);
router.get(
  "/me",
  authServices.checkJWT,
  authServices.checkRole("siteOwner"),
  BlogCtrl.getUserBlogs
);

router.get('/:id',BlogCtrl.getBlogById);


router.delete(
  "/:id",
  authServices.checkJWT,
  authServices.checkRole("siteOwner"),
  BlogCtrl.deleteBlog
);




module.exports = router;
