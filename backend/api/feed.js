module.exports = app =>{
    const feed = app.mongoose.model("configuracao",{
        nome: String,
        url: String,
        ativo: Boolean,
        createdAt: Date,
        updatedAt: Date
    }, "configuracao")

    const get = (req, res)=>{
        feed.find()
            .then(docs => {
            res.status(200).json({ data: docs })
        })            
        
    }
    const getById = (req, res) =>{
        feed.findOne({ _id: req.params.id})
            .then(feed => res.json(feed))
            .catch(err => res.status(500).send('ocorreu um erro'))
    }
    
    const save = (req, res) => {
        let feedRss = {...req.body}
        if (feedRss._id)
        {
            delete feedRss.updatedAt
            try {
                feed.updateOne({_id: feedRss._id},{$set:{...feedRss}, $currentDate: {updatedAt: true} })
                .then(result => res.status(204).send())
                //.catch(err => res.status(500).send())    
            } catch (error) {
                console.log(error)
            }
            
        }
        else{
            feedRss.createdAt = new Date();
            const feedNew = new feed({...feedRss})
            feedNew.save()
                .then(result => res.status(204).send())
                .catch(err => res.status(500).send())
        }
    }

    return {get, getById, save}
}