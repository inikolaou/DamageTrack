import express from 'express';
import { engine } from 'express-handlebars';
import { router } from './routes.js';

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/playground')
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));
//mongodb://localhost:27017
import mongoose from 'mongoose';


mongoose.connect('mongodb+srv://odkopakakis:xaripoter@damagetrack.wu1w1js.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
const reportSchema = new mongoose.Schema({
    description: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Finished'],
      default: 'Pending'
    },
    image: {
      type: String,
      required: true
    },
    urgency: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: true
    }
  }, { timestamps: true });

  const Report = mongoose.model('Report', reportSchema);



  const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });

  const User = mongoose.model('User', UserSchema);


  const LocationSchema = new mongoose.Schema({
    city: {
      type: String,
      required: true
    },
    streetName: {
      type: String,
      required: true
    },
    streetNumber: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  });

  const Location = mongoose.model('Location', LocationSchema);

  const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  });

  const Category = mongoose.model('Category', CategorySchema);

  async function createReport() {
    const user = await createUser();
    const location = await createLocation();
    const category = await createCategory();

    const report = new Report({
      description: 'my Description',
      user: user._id,
      location: location._id,
      category: category._id,
      status: 'Pending',
      image: 'image.jpg',
      urgency: 'Low'
    });

    const reportResult = await report.save();
    console.log(reportResult);
  }

  async function createUser() {
    const user = new User({
      email: 'example@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      city: 'New York',
      password: 'password123'
    });

    const savedUser = await user.save();
    return savedUser;
  }

  async function createLocation() {
    const location = new Location({
      city: 'New York',
      streetName: 'Main Street',
      streetNumber: '123',
      zipCode: '12345'
    });

    const savedLocation = await location.save();
    return savedLocation;
  }

  async function createCategory() {
    const category = new Category({
      name: 'Example Category'
    });

    const savedCategory = await category.save();
    return savedCategory;
  }

  createReport();

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use('/', router);

app.use((req, res) => {
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Η εφαρμογή ξεκίνησε στο http://127.0.0.1:${PORT}`));