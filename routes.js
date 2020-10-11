const routes = require("next-routes");

// Name   Page      Pattern
module.exports = routes() // ----   ----      -----
  .add("portfolio", "/portfolio/:id")
  .add("userBlogs", "/blog/dashboard")
  .add("blogEditor", "/blog/new")
  .add("portfolioNew", "/portfolios/new")
  .add("blogDetail", "/blog/:slug")
  .add("portfolioEdit", "/portfolio/:id/edit")
  .add("blockEditorUpdate", "/blog/:id/edit"); 