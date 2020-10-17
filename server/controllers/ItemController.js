const { Items, ItemPictures } = require('../models')
const path = require('path')

class ItemController {
  static async listItem(req, res, next) {
    try {
      const items = await Items.findAll({
        where: {
          status: 'unsold'
        },
        include: [ ItemPictures ]
      })

      res.status(200).json({items})
    } catch(errors) {
      return next(errors)
    }
  }

  static async createItem(req, res, next) {
    try {      
      delete req.body.image
      const payload = {
        ...req.body,
        current_price: req.body.starting_price,
        status: 'unsold',
        UserId: req.user.id
      }            
    
      const item = await Items.create(payload)  
      const images = req.files.images

      for(let i = 0; i < images.length;i++) {
        await ItemPictures.create({
          ItemId: item.id,
          path: `${images[i].name}`
        })
        images[i].mv(path.join(__dirname, `../../client/src/assets/images/${images[i].name}`))
      }      
      res.status(201).json({message: 'Sucessfully Created'})
    } catch(errors) {    
      console.log(errors)
      return next(errors)
    }
  }
}

module.exports = ItemController