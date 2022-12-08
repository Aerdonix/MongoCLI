class Movie {
    constructor (title, actor = "Not specified") {
        this.title = title;
        this.actor = actor;
    };
    async create(movieCollection) {
        console.log("Entering create within index.js");
        await movieCollection.insertOne(this);
    };
};

module.exports = Movie;