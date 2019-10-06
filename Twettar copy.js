const MongoClient = require('mongodb').MongoClient;
var Twitter = require('twitter');
let min = 1000 * 60 * 2;
    max = 1000 * 60 * 6;
var clientTT = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

const url = 'mongodb://localhost:27017';
const getIntervaloAtual =
                () => Math.floor(Math.random() * (max - min + 1) + min)
                MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
setInterval(() => {
    try {

        
            try {
                const db = client.db("twitterfeed");
                db.collection('posts').findOne({ $or: [{processado: false }, {processed: false}]}, (err, result) => {
                    if (result) {
                        let titulo = `${result.title}`,
                            link = result.link;
                            console.log(result._id)
                            clientTT.post('statuses/update', { status: titulo + " " + link }, function (error, tweet, response) {
                            if (error) console.log(error) //throw error;
                            //console.log(tweet);  // Tweet body.
                            //console.log(response);  // Raw response object.
                        });
                        db.collection('posts').updateOne({ _id: result._id }, { $set: { processado: true, processed: true }, $currentDate: { updatedAt: true } }).catch(err => {console.log(`ocorreu um erro ${err}`)})
                    }
                })
            } catch (error) {
                console.log(error);
            }
        
        
    } catch (error) {

    }

}, getIntervaloAtual());

})