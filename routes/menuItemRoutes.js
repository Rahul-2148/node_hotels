const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItem');


router.post('/', async (_req, res) => {
    try {
      const MenuItemData = _req.body;
  
      const newMenuItem = new MenuItem(MenuItemData);
  
      const response = await newMenuItem.save();
      console.log('New Menu data saved');
      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Get method to get all menu items
  router.get('/', async (_req, res) => {
    try {
      const menuItems = await MenuItem.find();
      console.log('All menu items fetched');
      res.status(200).json(menuItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/:taste', async (req, res) => {
    try {
      const taste = req.params.taste;

      if(taste == "sweet" || taste == "spicy" || taste == "savory" || taste == "bitter" || taste == "sour"){
      const menuItems = await MenuItem.find({ taste: taste });
      console.log('Menu items fetched based on taste');
      res.status(200).json(menuItems);
      }else{
        res.status(400).json({ error: 'Invalid taste parameter' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  module.exports = router;