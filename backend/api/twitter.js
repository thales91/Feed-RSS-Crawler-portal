module.exports = app =>{
    const twitterKeys = app.mongoose.model('twitterkey',{
        consumer_key: String,
        consumer_secret:String,
        access_token_key:String,
        access_token_secret:String,
        createdAt: Date,
        updatedAt: Date
    })
    const get = (req, res) =>{
        twitterKeys.findOne({},{}, {sort:{createdAt: -1}})
        .then(keys => {
            res.json(keys)
        }).catch(err => res.status(500).send(err)) 
    }
    const save = (req, res) => {
        let keys = {...req.body}
        if(keys._id)
        {
            delete keys.updatedAt
            
            twitterKeys.updateOne({_id: keys._id},{$set: {...keys}, $currentDate: { updatedAt: true }})
                .then(()=>{
                    res.status(204).send()
                }).catch((err) => {console.log(err);
                    res.status(500).send('ocorreu um erro')})
        }
        else {
            keys.createdAt = new Date();
            const keysTwitter = new twitterKeys({ ...keys})
            keysTwitter.save()
                .then(()=>{
                    res.status(204).send()
                }).catch(err => res.status(500).send('err'))
        }
    }
    return {save, get}
}