import express from 'express';
import Joi from 'joi';
import validator from 'express-joi-validator';
import logger from '../logger';
import { AreaHandler } from '../handler/area.handler';


const log = logger.Logger;

const router = express.Router();
// please separate  out 
const schema = {
	body: {
		areaName: Joi.string().min(3).required(),
		cityId:Joi.number().required()


	}
}
// get ALL
router.get('/', (req, res) => {
	let start = req.query.start;
	let end = req.query.end;
	let searchText = req.query.searchText;
	console.log("Start" + start + "  end " + end);

	// for pagination flow 
	if (start !== undefined && end !== undefined) {
		let pagination ={}
		pagination.start = start;
		pagination.end = end;
		pagination.searchText = searchText;
		let resultPromise = AreaHandler.getPagedData(pagination);
		resultPromise.then(function (result) {
			if (result) {
				res.status(200).send(result);
			}
		}).catch(err => {
			//console.log(err);
			log.error(err);
			res.status(500).send({ "message": "Something went wrong" });
		});
	} else {
		let resultPromise = AreaHandler.getAll();
		resultPromise.then(function (result) {
			if (result) {
				res.status(200).send(result);
			}
		}).catch(err => {
			log.error(err);
			res.status(500).send({ "message": "Something went wrong" });
		});
	}



});


// get ONE
router.get('/:id', (req, res) => {
	let id = req.params.id;

	let resultPromise = AreaHandler.getOne(id);
	console.log("client id " + id)
	resultPromise.then(function (result) {
		if (result) {
			res.status(200).send(result);
		}
	}).catch(err => {
		log.error(err);
		res.status(500).send({ "message": "Something went wrong" });
	});
});

//demo route
router.get('/test', (req, res) => {
	res.status(200).send("Server running");
	
});


// save obj
router.post('/', validator(schema, { allowUnknown: true, abortEarly: false }), (req, res, next) => {
	let resultPromise = AreaHandler.save(req.body);
	resultPromise.then(function (result) {
		if (result) {
			res.status(200).send(result);
		}
	}).catch(err => {
		log.error(err);
		res.status(500).send({ "message": "Something went wrong" });
	});

});

// update ONE obj
router.put('/:id', validator(schema, { allowUnknown: true, abortEarly: false }), (req, res, next) => {
	let id = req.params.id;
	console.log("Router put + id"+id);
		let resultPromise = AreaHandler.updateOne(req.body,id);

	resultPromise.then(function (result) {
		if (result) {
			res.status(200).send(result);
		}
	}).catch(err => {
		log.error(err);
		res.status(500).send({ "message": "Something went wrong" });
	});

});


// get ONE
router.delete('/:id', (req, res) => {
	let id = req.params.id;
	console.log("Delete Route Called");
	let resultPromise = AreaHandler.deleteOne(id);
	resultPromise.then(function (result) {
		if (result) {
			res.status(200).send(result);
		}
	}).catch(err => {
		log.error(err);
		res.status(500).send({ "message": "Something went wrong" });
	});
});


export default router;
