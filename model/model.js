import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config'

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
    enum: ['Pending', 'Ongoing', 'Finished'],
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
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    select: false
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

async function createSuperUser() {
  const user = new User({
    email: process.env.adminEmail,
    firstName: 'admin',
    lastName: 'Doe',
    phone: '1234567890',
    city: 'New York',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true
  });

  let adminExists = await User.findOne({ isAdmin: true }); // include the isAdmin property when querying the user document

  if (!adminExists) {
    await user.save({ strict: false });
  }
}

async function createLocation() {
  const location = new Location({
    city: 'athens',
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

createSuperUser();
export { User }
export { Category }
export { Report }
export { Location }