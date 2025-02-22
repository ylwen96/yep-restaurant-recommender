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
}, { collation: 'restaurants' });

const uri = "mongodb+srv://tyleryuelinwen:yWDkmbDduOxDXE7G@cluster0.b1enb.mongodb.net/sample_restaurants?retryWrites=true&w=majority&appName=Cluster0";

module.exports = class RestaurantDB{
    initialize() {
        return new Promise((resolve, reject) => {
            let db = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });

            db.on('error', () => {
                reject();
            });
            db.once('open', () => {
                this.Restaurant = db.model("restaurants", restaurantSchema);
                console.log("connection established correctly")
                resolve();
            });
        });
    }
}