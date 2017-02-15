/**
 * MatchController
 *
 * @description :: Server-side logic for managing matches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getSocket: function(req, res){
		if (req.socket) {
			Match.watch(req.socket);
		}
	},

	// DELETE delete the current match
	reset: function(req, res){
		Match.destroy({}).exec(function(err,deleted){
			if (err) {
				return res.json(err.status, {err: err});
			}
			if (deleted) {
				return res.json(deleted[0]);
			}
		});
	},

	// GET show the current match
	show: function(req, res){
		Match.find({}).exec(function(err,match){
			if (err) {
				return res.json(err.status, {err: err});
			}
			if (match.length>0) {
				return res.json(match[0]);
			}else{
				return res.json(401, {err: 'No Match exist'})
			}
		});
	},

	// PUT update the score match
	score: function(req, res){
		Match.find({}).exec(function(err,match){
			if (err) {
				return res.json(err.status, {err: err});
			}
			if (match.length==0) {
				return res.json(401, {err: 'No Match exist'});
			}else{
				var id = match[0].id;

				if (!req.body || req.body.score < 0 || req.body.isHome==null) {
					return res.json(401, {err: 'Please fill in all the fields'});
				}

				var isHome = req.body.isHome;
				var score = req.body.score;

				if (isHome) {
					Match.update({},{
						home_score: score,
					}).exec(function(err, match){
						if (err) {
							return res.json(err.status, {err: err});
						}
						if (match) {
							Match.publishUpdate(id,{
								home_score: score,
							});
							return res.json(match[0]);
						}
					});
				}else{
					Match.update({},{
						away_score: score,
					}).exec(function(err, match){
						if (err) {
							return res.json(err.status, {err: err});
						}
						if (match) {
							Match.publishUpdate(id,{
								away_score: score,
							});
							return res.json(match[0]);
						}
					});
				}
			}
		});
	},

	// POST to initialize a match
	init: function(req, res){
		if (!req.body || !req.body.home_name || !req.body.away_name) {
			return res.json(401, {err: 'Please fill in all the fields'});
		}

		// menghitung jumlah pertandingan
		Match.count({}).exec(function countMatch(error, found){
			//jika ditemukan lebih dari 0 berarti harus direset dahulu
			if(found>0){
					//Destroy
					Match.destroy({}).exec(function(error){
						if (error) {
							return res.json({error: error});
						}
					});
					//Create
					Match.create({
						name: req.body.name,
						home_name: req.body.home_name,
						home_score: 0,
						away_name: req.body.away_name,
						away_score: 0
					}).exec(function(error, match){
						if (error) {
							return res.json({error: error});
						}else{
							return res.json(match);
						}
					});
			}else{
				//Create
				Match.create({
					name: req.body.name,
					home_name: req.body.home_name,
					home_score: 0,
					away_name: req.body.away_name,
					away_score: 0
				}).exec(function(error, match){
					if (error) {
						return res.json({error: error});
					}else{
						return res.json(match);
					}
				});
			}
		});
	}

};
