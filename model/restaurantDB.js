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
        score: Number,
        comments: String
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

    getAllRestaurants(page, perPage, borough) {
        let findBy = borough ? { borough } : {};

        if (+page && +perPage) {
            return this.Restaurant.find(findBy).sort({ restaurant_id: +1 }).skip((page - 1) * +perPage).limit(+perPage).exec();
        }
        return Promise.reject(new Error('page and perPage query parameters must be present'));
    }

    getRestaurantByName(page, perPage, name) {
        if (+page && +perPage) {
            return this.Restaurant.find({ name: name }).sort({ restaurant_id: +1 }).skip((page - 1) * +perPage).limit(+perPage).exec();
        }
        return Promise.reject(new Error('page and perPage query parameters must be present'));
    }

    getRestaurantById(id) {
        return this.Restaurant.findOne({ _id: id }).exec();
    }

    async updateRestaurantById(id, comment, grade) {
        if (!comment || !grade) {
            throw new Error("Comment and grade are required.");
        }

        let newGrade = {
            date: new Date().toString(),
            grade: grade,
            score: 0,
            comments: comment
        };

        let result = await this.Restaurant.updateOne(
            { _id: id },
            { $push: { grades: newGrade } }
        );

        if (result.modifiedCount === 0) {
            throw new Error("Restaurant not found or not updated.");
        }

        return `Comment added to restaurant ${id} successfully.`;
    }
}

const db = new RestaurantDB();
module.exports = db;