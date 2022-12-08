const yargs = require("yargs");
const {client, connect} = require("./db/connection");
const Movie = require("./utils/index");


async function main (yargsinput) {
    const movieCollection = await connect();
    if(yargsinput.create) {
        console.log("Create Phase");
        const newMovie = new Movie (yargsinput.title, yargsinput.actor, yargsinput.starRating, yargsinput.releaseYear);
        await newMovie.create(movieCollection);
    await client.close();
    } else if (yargsinput.read) {
        console.log("Read Phase");
        const query = await movieCollection.find({}).toArray();
        console.table(query);
    await client.close();
    } else if (yargsinput.update) {
        console.log("Update Phase");
        const myQuery = {title: yargsinput.title}
        const myUpdate = {$set: { actor: yargsinput.actor}}
        await movieCollection.updateOne(myQuery,myUpdate);
    await client.close();
    } else if (yargsinput.delete) {
        console.log("Delete Phase");
        const myQuery = {title: yargsinput.title}
        const output = await movieCollection.deleteOne(myQuery);
        if (output.deletedCount === 1) {
            console.log("Entry Deleted");
        } else {
            console.log ("Access Denied");
        }
    await client.close();
    } else {
        console.log("Not Recognised.");
    } 
};

main(yargs.argv);