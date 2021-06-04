const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('name').notEmpty().withMessage('What`s the name of this character?').bail()
        .isAscii().withMessage('Please, enter valid characters'),
	body('age').notEmpty().withMessage('The movie must have a score').bail()
        .isAlphanumeric().withMessage('How old is this character?'),
	body('weight').optional({checkFalsy:true})
        .isAscii().withMessage('Please, enter valid characters'),
    body('story').optional({checkFalsy:true})
        .isAscii().withMessage('Please, enter valid characters'),
    body('movie1').optional({checkFalsy:true})
        .isAscii().withMessage('Please, enter valid characters'),
	body('movie2').optional({checkFalsy:true})
        .isAscii().withMessage('Please, enter valid characters'),
    body('movie3').optional({checkFalsy:true})
        .isAscii().withMessage('Please, enter valid characters'),
	body('movie4').optional({checkFalsy:true})
        .isAscii().withMessage('Please, enter valid characters'),
    body('movie5').optional({checkFalsy:true})
        .isAscii().withMessage('Please, enter valid characters'),
	body('characterImage').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', ".jpeg", '.png', '.gif'];	

		if (!file) {
			throw new Error('Please, add the image of this character');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Accepted extensiones: ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]