const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('title').notEmpty().withMessage('The movie must have a title').bail()
        .isAscii().withMessage('Please enter valid characters'),
	body('score').notEmpty().withMessage('The movie must have a score').bail()
        .isAlphanumeric().withMessage('The score must be a number between 1 and 5'),
	body('character1').optional({checkFalsy:true})
        .isAscii().withMessage('Please enter valid characters'),
    body('character2').optional({checkFalsy:true})
        .isAscii().withMessage('Please enter valid characters'),
    body('character3').optional({checkFalsy:true})
        .isAscii().withMessage('Please enter valid characters'),
	body('genre1').optional({checkFalsy:true})
        .isAscii().withMessage('Please enter valid characters'),
    body('NewGenre1').optional({checkFalsy:true})
        .isAscii().withMessage('Please enter valid characters'),
    body('genre2').optional({checkFalsy:true})
        .isAscii().withMessage('Please enter valid characters'),
    body('NewGenre2').optional({checkFalsy:true})
        .isAscii().withMessage('Please enter valid characters'),
    body('genre3').optional({checkFalsy:true})
        .isAscii().withMessage('Please enter valid characters'),
    body('NewGenre3').optional({checkFalsy:true})
        .isAscii().withMessage('The new genre name must be alphanumeric'),
	body('release').isDate().withMessage('Please enter a valid date'),
	body('moviePoster').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', ".jpeg", '.png', '.gif'];	

		if (!file) {
			throw new Error('Please, add the poster of this movie');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Accepted extensiones: ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]