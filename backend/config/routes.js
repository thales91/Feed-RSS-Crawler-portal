module.exports = app =>{
    app.route('/plataforma/twitter')
        .get(app.api.twitter.get)
        .put(app.api.twitter.save)
        .post(app.api.twitter.save)

    app.route('/feed')
        .get(app.api.feed.get)
        .put(app.api.feed.save)
        .post(app.api.feed.save)

    app.route('/feed/:id')
        .get(app.api.feed.getById)

    app.route('/post')
        .get(app.api.post.get)
        .put(app.api.post.save)
        .post(app.api.post.save)
    
    app.route('/post/:id')
        .get(app.api.post.getById)

    app.route('/posts/dashboard')
        .get(app.api.post.getDashboard)
        
} 