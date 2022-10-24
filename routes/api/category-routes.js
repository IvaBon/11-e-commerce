const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const allCategories=await Category.findAll({
      include:[
        {
          model:Product
        }
      ]
    })
    res.json(200).json(allCategories)
  }catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const oneCategory=await Category.findByPk(req.params.id,{
      include:[
        {
          model:Product
        }
      ]
    })
    res.json(200).json(oneCategory)
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((cat)=>{
    res.json(cat)
  })
  .catch((err)=>res.json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  .then((updatedCat)=>{
    res.json(updatedCat)
  })
  .catch((err)=>res.json(err))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(req.body,{
    where:{
      id:req.params.id
    }
  })
  .then((deletedCat)=>{
    res.json(deletedCat)
  })
  .catch((err)=>res.json(err))
});

module.exports = router;
