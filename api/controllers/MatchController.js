/**
 * MatchController
 *
 * @description :: Server-side logic for managing matches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	// GET show the current match
	show: function(req, res){
		Match.find({}).exec(function(err,match){
			if (err) {
				return res.json(err.status, {err: err});
			}
			if (match.length > 0) {
				//See http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub/subscribe
				Match.subscribe(req, match);
				return res.json(match[0]);
			}else{
				return res.json(401, {err: 'No Match exist'})
			}
		});
	},

	// POST to initialize/edit a match
	init: function(req, res){
		Match.count({}).exec(function countMatch(err, found){
			if(found>0){
				Match.update({},{
					name: req.body.name,
					home_name: req.body.home_name,
					home_score: req.body.home_score,
					away_name: req.body.away_name,
					away_score: req.body.away_score
				}).exec(function(err, match){
					if (err) {
						return res.json(err.status, {err: err});
					}
					if (match) {
						//See http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub/publish-update
						Match.publishUpdate(match[0].id,{
							name: req.body.name,
							home_name: req.body.home_name,
							home_score: req.body.home_score,
							away_name: req.body.away_name,
							away_score: req.body.away_score
						});
						return res.json(match[0]);
					}
				});
			}else{
				Match.create({
					name: req.body.name,
					home_name: req.body.home_name,
					home_score: req.body.home_score,
					away_name: req.body.away_name,
					away_score: req.body.away_score
				}).exec(function(err, match){
					if (err) {
						return res.json(err.status, {err: err});
					}
					if (match) {
						//See http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub/publish-create
						Match.publishCreate(match);
						return res.json(match);
					}
				});
			}
		});
	}

};
