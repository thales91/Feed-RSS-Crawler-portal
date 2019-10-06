module.exports = app =>{
    const post = app.mongoose.model("posts",{
        title: String,
        url: String,
        processed: Boolean,
        createdAt: Date,
        updatedAt: Date
    }, "posts")

    const get = (req, res)=>{
        post.find().count((err, count)=>{
        post.find({},{},{skip:parseInt(req.query.skip) || 0, limit:parseInt(req.query.limit) || 10})
            .then(posts => {
            res.status(200).json({ data: posts, total:count })
        })            
    })
    }
    const getById = (req, res) =>{
        post.findOne({ _id: req.params.id})
            .then(post => res.json(post))
            .catch(err => res.status(500).send('ocorreu um erro'))
    }
    
    const save = (req, res) => {
        let postBody = {...req.body}
        if (postBody._id)
        {
            delete postBody.updatedAt
            try {
                post.updateOne({_id: postBody._id},{$set:{...postBody}, $currentDate: {updatedAt: true} })
                .then(result => res.status(204).send())
                //.catch(err => res.status(500).send())    
            } catch (error) {
                console.log(error)
            }
            
        }
        else{
            postBody.createdAt = new Date();
            const postNew = new post({...postBody})
            postNew.save()
                .then(result => res.status(204).send())
                .catch(err => res.status(500).send())
        }
    }

    const getDashboard = (req, res) =>
    {
        post.find({ $or: [{processado: false }, {processed: false}]},{},{skip: 0, limit:3})
            .then(posts => {
                res.status(200).json({ data: posts})
            })  
    }

    return {get, getById, save, getDashboard}
}