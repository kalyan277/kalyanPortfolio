const Portfolio =require('../models/portfolio');

exports.getPortfolios=(req,res)=>{
  Portfolio.find({})
  .sort({'startDate':1})
  .exec((err,allPortfolios)=>{
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(allPortfolios);
  });
}

exports.savePortfolio = (req, res) => {
    const PortfolioData =req.body;
    const userId =req.user && req.user.sub;
    const portfolio =new Portfolio(PortfolioData);
    portfolio.userId=userId;
    portfolio.save((err,createdPortfolio)=>{
      if(err){
        return res.status(422).send(err);
      }
      return res.json(createdPortfolio);
    });
}

exports.updatePortfolio = (req, res) => {
   const portfolioId = req.params.id;
   const portfolioData = req.body;
   Portfolio.findById(portfolioId,(err,foundPortfolio)=>{
          if(err){
        return res.status(422).send(err);
      }
    foundPortfolio.set(portfolioData)
    foundPortfolio.save((err, savePortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }
    return res.json(savePortfolio);
  });
})
}


exports.deletePortfolio = (req, res) => {
  const portfolioId = req.params.id;
 // console.log(portfolioId);
  Portfolio.deleteOne({ _id: portfolioId }, (err, deletePortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }
    return res.json({ status: "DELETED" });
  });
  req.end();
};

exports.getPortfolioById = (req, res) => {
  const portfolioId = req.params.id;
  //exclude the __v property
  Portfolio.findById(portfolioId).select('-__v').exec((err,foundPortfolio)=>
  {
        if (err) {
          return res.status(422).send(err);
        }
          return res.json(foundPortfolio);
  })

};

