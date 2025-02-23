const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    address: {
        building: String,
        coord: [Number],
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    grades: [{
        date: Date,
        grade: String,
        score: Number
    }],
    name: String,
    restaurant_id: String
});

const uri = "mongodb+srv://tyleryuelinwen:yWDkmbDduOxDXE7G@cluster0.b1enb.mongodb.net/sample_restaurants?retryWrites=true&w=majority&appName=Cluster0";

class RestaurantDB {
    constructor() {
        this.Restaurant = null;
    }

    initialize() {
        return new Promise((resolve, reject) => {
            let db = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });

            db.on('error', () => {
                reject();
            });
            db.once('open', () => {
                console.log(db.collections); 
                this.Restaurant = db.model("restaurant", restaurantSchema, "restaurants"); 
                console.log("connection established correctly");
                console.log("this.Restaurant:", this.Restaurant);
                resolve();
            });
            db.on('disconnected', () => {
                console.log('Disconnected from MongoDB');
            });
        });
    }

    getRestaurantById(id) {
        return this.Restaurant.findOne({ _id: id }).exec();
    }
}

const db = new RestaurantDB();
module.exports = db;