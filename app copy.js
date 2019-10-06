let Parser = require('rss-parser')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let parser = new Parser()
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
setInterval(() => {  
    assert.equal(null, err);
    const db = client.db("twitterfeed");

    let cursor = db.collection('configuracao').find()

    function iterateFunc(doc) {
      const feed = async () => {
        //console.log(doc.url);
        let feed = await parser.parseURL(doc.url)
        //console.log(new Date(feed.items[0].pubDate))
        let dataPrimeiroItem = new Date(feed.items[0].pubDate),
        ultimoPost =  doc.ultimopost ? new Date(doc.ultimopost) : new Date(doc.createdAt)
        console.log(dataPrimeiroItem > ultimoPost, dataPrimeiroItem, ultimoPost, doc.url, );
        if (dataPrimeiroItem > ultimoPost) {
         
          //dataPrimeiroItem = new Date(dataPrimeiroItem[0].split('/')[2],dataPrimeiroItem[0].split('/')[1], dataPrimeiroItem[0].split('/')[0], dataPrimeiroItem[1].split(':')[0],dataPrimeiroItem[1].split(':')[1])
          let TotalPosts = doc.TotalPosts || 0;
          feed.items.forEach(item => {
            try {
              //console.log(item.link, doc.pubDate)

              //let pubdate = item.pubDate.split(' ')
              //let dataPublidao = new Date(pubdate[0].split('/')[2], pubdate[0].split('/')[1], pubdate[0].split('/')[0], pubdate[1].split(':')[0], pubdate[1].split(':')[1])
              dataPublidao = new Date(item.pubDate)
              console.log(dataPublidao, new Date(doc.ultimopost), dataPublidao > ultimoPost, item.title)
              if (dataPublidao > ultimoPost) {
                TotalPosts++;
                db.collection('posts').insertOne({
                  title: item.title,
                  link: item.link,
                  processado: false,
                  created_at: new Date(),
                  updated_at: new Date(),
                  origemId: doc._id
                })
              }
            } catch (error) {
              console.log(error)
            }
          });

          db.collection('configuracao').updateOne({ url: doc.url }, { $set: { ultimopost: dataPrimeiroItem, updated_at: new Date(), TotalPosts: TotalPosts }, $currentDate: { lastModified: true } })

        }
      };
      feed()
    }

    function errorFunc(error) {
      console.log(error);
    }
    cursor.forEach(iterateFunc, errorFunc);
    //
}, 1000 * 60 * 5);
});




