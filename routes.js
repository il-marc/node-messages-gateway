const ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {
    app.get('/api', function (req, res) {
        if (!req.query.phone || !req.query.text || !req.query.password) {
            res.statusCode = 400;
            res.send({error: 400});
        } else {
            const message = {
                time: Date.now(),
                phone: req.query.phone,
                text: req.query.text
            };
            req.db.collection(req.query.password).insertOne(message, function (err, result) {
                if (err) throw err;
                res.send(result.ops[0]);
            });
        }
    });
    app.get('/:collection/messages', function (req, res) {
        req.db.collection(req.params.collection).find().toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.get('/:collection/messages/:id', function (req, res) {
        const id = req.params.id;
        req.db.collection(req.params.collection).findOne({ '_id': new ObjectID(id) }, function(err, result) {
            if (err) throw err;
            res.send({ok: result.ok});
        });
    });
    app.delete('/:collection/messages/:id', function (req, res) {
        const id = req.params.id;
        req.db.collection(req.params.collection).removeOne({ '_id': new ObjectID(id) }, function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
};