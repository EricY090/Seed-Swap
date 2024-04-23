import { Router } from "express";
import peppers from "../data/peppers.js";
import userspeppers from "../data/userspeppers.js";
const router = Router();
import session from "express-session";
import pepperValidation from "../pepperValidation.js";

//add /pepper at some point;

router
.route('/')
.get(async (req, res) => {
  try{
    const allPeppers = await peppers.getAllPeppers();
    return res.render('pepper/peppers', {peppers: allPeppers});
  } catch (e) {
    res.status(404).json(e);
  }
});

router.route('/').post(async (req, res) => {
  const allPeppers = await peppers.getAllPeppers();
  try {
    if(req.body['inv-id']){
      const pepper = await peppers.getPepperById(req.body['inv-id']);
      const pepperName = pepper.varietyName;
      await userspeppers.addPepperToUserInv(req.session.user._id, pepperName);
    } else if(req.body['wish-id']){
      const pepper = await peppers.getPepperById(req.body['wish-id']);
      const pepperName = pepper.varietyName;
      await userspeppers.addPepperToUserWL(req.session.user._id, pepperName);
    } else if(req.body['filter']){
      let query_new = {}
      for(let x of Object.keys(req.body)){
        if(!req.body[x]){
          continue;
        } else {//if user picks all species just skip including the term
          if(x === 'species' && req.body[x] === 'all'){
            continue;
          }
          if(x === 'heatLevel' && req.body['filterByHeat']){ //only add heat filter if the box is checked
            query_new[x] = parseInt(req.body[x]);
          } else if(x !== 'heatLevel'){
            query_new[x] = req.body[x];
          }
        }
      }
      if(req.body.minsize && req.body.maxsize){
        query_new['sizeCM'] = pepperValidation.validateSizeCM([parseInt(req.body['minsize']), parseInt(req.body['maxsize'])]);
      }
      const new_peppers = await peppers.filterPeppersByProperties(query_new);
      return res.render('pepper/peppers', {peppers: new_peppers});
    }
    return res.render('pepper/peppers', {peppers: allPeppers});
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
})

export default router;
