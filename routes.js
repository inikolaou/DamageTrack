import express from 'express';
import fs from 'fs/promises';
import bcrypt from "bcrypt";
import { Location, Category, Report, User } from './model/model.js';
import { transporter, mailOptions } from './email.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (req.session.isAdmin == undefined) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 3;
      let totalReports;
      let totalPages;
      let merged_query;
      const skip = (page - 1) * limit;

      const { text, urgency, status } = req.query;
      const query = {};

      if (urgency && urgency !== 'all') {
        query.urgency = urgency;
      }

      if (status && status !== 'all') {
        query.status = status;
      }

      if (text) {
        query.description = { $regex: text, $options: "i" };
      }

      let reports;
      if (req.query['reports'] === 'all') {
        query.user = { $ne: req.session.user_id }
        totalReports = await Report.countDocuments(query);
        totalPages = Math.ceil(totalReports / limit);
        reports = await Report.find(query).populate("category").populate("location")
          .sort({ likes: -1 })
          .skip(skip)
          .limit(limit)
          .lean();

        res.locals.all = true;
        reports.sort((a, b) => b.likes.length - a.likes.length);
        return res.render('homepage', {
          session: req.session.mySessionName,
          user_id: req.session.user_id,
          css: "index.css",
          js: "index.js",
          reports,
          totalPages,
          currentPage: page
        });
      }
      else {
        merged_query = Object.assign({}, query, { user: req.session.user_id })
        totalReports = await Report.find(merged_query).countDocuments();
        totalPages = Math.ceil(totalReports / limit);
        reports = await Report.find(merged_query).populate("category").populate("location")
          .skip(skip)
          .limit(limit)
          .lean();

        return res.render('homepage', {
          session: req.session.mySessionName,
          css: "index.css",
          js: "index.js",
          user_id: req.session.user_id,
          user: true,
          reports,
          totalPages,
          currentPage: page
        });
      }
    }
    else {
      return res.redirect('/admin');
    }
  }
  catch (err) {
    console.log(err);
  }
});

// Route for updating likes
router.get('/like/:reportId', async (req, res) => {
  const reportId = req.params.reportId;
  const userId = req.session.user_id;

  try {
    // Find the post with the given ID
    const report = await Report.findById(reportId);
    let postLiked = true;

    // Check if the user ID is already in the likes array
    const userIndex = report.likes.indexOf(userId);
    if (userIndex !== -1) {
      // User has already liked the post, so remove the like
      report.likes.splice(userIndex, 1);
      postLiked = false;
    } else {
      // User has not liked the post, so add the like
      report.likes.push(userId);
    }

    // Save the updated post
    await report.save();

    if (postLiked) {
      res.send({ "likes": report.likes.length, "text": "I am interested" });
    }
    else {
      res.send({ "likes": report.likes.length, "text": "I am not interested"  });
    }
  } catch (err) {
    console.error('Error updating likes', err);
    res.status(500).send('Internal Server Error');
  }
});

router.get(/^\/sign\/$/, (req, res) => {
  res.redirect("/sign");
})

router.get('/sign', (req, res) => {
  if (req.session.mySessionName == undefined) {
    res.render('signupLogin', {
      css: "signupLogin.css",
      js: "signupLogin.js"
    });
  }
  else {
    res.redirect('/');
  }
});

router.get("/logout", (req, res) => {
  if (req.session.mySessionName == undefined) {
    res.redirect('/');
  }
  else {
    req.session.destroy((err) => { console.log("session destroyed") });
    res.redirect('/');
  }
})

router.post("/login", async (req, res) => {
  let user = await User.find({
    email: req.body['loginEmail']
  }).select('+isAdmin').limit(1);

  // User not authenticated
  if (user.length === 0) {
    return res.render('signupLogin', { js: 'user_notexists.js' });
  }
  else {
    const match = await bcrypt.compare(req.body['loginPassword'], user[0]['password']);
    if (match) {
      if (req.session.mySessionName == undefined) {
        req.session.mySessionName = 'damageTrack-session';
        req.session.user_id = user[0]['_id'];
        if (user[0]['isAdmin']) {
          req.session.isAdmin = true;
        }
        res.redirect('/');
      }
      else {
        res.redirect('/');
      }
    }
    else {
      res.redirect("/");
    }
  }
}
);

router.post("/signup", async (req, res) => {
  const { signUpEmail, signUpPassword, signUpFirstName, signUpLastName, signUpPhone, signUpCity } = req.body;

  // Check if the email already exists in the database
  const existingUser = await User.findOne({ email: signUpEmail });

  if (existingUser) {
    return res.render('signupLogin', { js: 'user_exists.js' });
  }

  // Create a new user
  const newUser = new User({
    email: signUpEmail,
    password: bcrypt.hashSync(signUpPassword, 10),
    firstName: signUpFirstName,
    lastName: signUpLastName,
    phone: signUpPhone,
    city: signUpCity
  });

  await newUser.save();

  res.redirect('/sign');
});

router.get(/^\/report\/$/, (req, res) => {
  res.redirect("/report");
})

router.get('/report', (req, res) => {
  if (req.session.isAdmin == undefined) {
    res.render('reportForm', { layout: 'report' });
  }
  else {
    res.redirect('/admin');
  }
});

router.post('/report', async (req, res) => {
  try {
    // Extract the necessary data from the request body
    let { category, otherCategory, description, city, streetName, streetNumber, zipCode } = req.body;
    const activeUser = req.session.user_id;
    const urgencyMapping = ['Low', 'Medium', 'High'];
    const urgencyValue = urgencyMapping[req.body.urgency];

    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    // Need to do this client side first !!
    if (! /^image/.test(image.mimetype)) {
      return res.sendStatus(400);
    }

    let path = 'public/images/' + image.name;

    try {
      await fs.access(path);
    } catch (err) {
      console.log(`${path} does not exist`);
      await image.mv('public/images/' + image.name);
    }

    // Find or create the location based on the provided data
    let location = await Location.findOne({ city, streetName, streetNumber, zipCode });
    if (!location) {
      location = new Location({ city, streetName, streetNumber, zipCode });
      await location.save();
    }
    if (category == 'other') {
      category = otherCategory;
    }
    // Find or create the category based on the provided type
    let newCategory = await Category.findOne({ name: category });
    if (!newCategory) {
      newCategory = new Category({ name: category });
      await newCategory.save();
    }

    // Create a new instance of the Report model with the extracted data and the location and category objects
    const report = new Report({
      description,
      user: activeUser,
      location,
      category: newCategory,
      status: 'Pending',
      image: image.name,
      urgency: urgencyValue,
      likes: []
    });

    // Save the report to the database
    const savedReport = await report.save();

    transporter.sendMail(
      {
        ...mailOptions,
        subject: 'New Damage Report',
        // text: 'A new damage report has been uploaded.',
        html: `
      <h1>New Damage Report</h1>
      <p>A new damage report has been uploaded.</p>
      <h2>Report Details:</h2>
      <ul>
        <li><strong>Category:</strong> ${category}</li>
        <li><strong>Description:</strong> ${description}</li>
        <li><strong>City:</strong> ${city}</li>
        <li><strong>Street Name:</strong> ${streetName}</li>
        <li><strong>Street Number:</strong> ${streetNumber}</li>
        <li><strong>ZIP Code:</strong> ${zipCode}</li>
        <li><strong>Urgency:</strong> ${urgencyValue}</li>
      </ul>
    `
      },
      (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      }
    );

    res.redirect('/')
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle any errors
  }
});

router.get(/^\/admin\/$/, (req, res) => {
  res.redirect("/admin");
})

router.get('/admin', async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.session.user_id
    }).select('+isAdmin').exec();

    if (user === null) {
      res.redirect('/');
    }
    else {
      if (req.session.isAdmin == undefined) {
        res.redirect('/');
      }
      else {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        const { text, urgency, status } = req.query;
        const query = {};

        if (urgency && urgency !== 'all') {
          query.urgency = urgency;
        }

        if (status && status !== 'all') {
          query.status = status;
        }

        if (text) {
          query.description = { $regex: text, $options: "i" };
        }

        const totalReports = await Report.countDocuments(query);
        const totalPages = Math.ceil(totalReports / limit);

        const reports = await Report.find(query)
          .populate('category')
          .populate('location')
          .sort({ likes: -1 })
          .skip(skip)
          .limit(limit)
          .lean();
        reports.sort((a, b) => b.likes.length - a.likes.length);

        res.render('adminDashboard', { layout: 'admin', js: "admin.js", reports, totalPages, currentPage: page });
      }
    }
  }
  catch (err) {
    console.log(err);
  }
});


router.post('/admin/status/:reportId', async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.session.user_id
    }).select('+isAdmin').exec();

    if (user === null) {
      res.redirect('/');
    }
    else {
      if (req.session.isAdmin == undefined) {
        res.redirect('/');
      }
      else {
        const reportId = req.params.reportId;
        const newStatus = req.body.status;
        const report = await Report.findById(reportId)
          .populate('user')
          .populate({
            path: 'location',
            select: 'city streetName streetNumber zipCode',
          })
          .populate({
            path: 'category',
            select: 'name',
          });

        report.status = newStatus;
        console.log(report.user.email)
        await report.save();

        // Extract the location details from the populated location object
        const { city, streetName, streetNumber, zipCode } = report.location;
        const { name } = report.category;

        // Extract the details from the report
        const { description, urgency, status } = report;

        const dynamicMailOptions = {
          ...mailOptions,
          to: report.user.email, // Set the recipient email dynamically
          html: `
            <h1>Damage Report Update</h1>
            <p>Your uploaded report with id:  ${reportId} has changed to  ${newStatus}</p>
            <h2>Report Details:</h2>
            <ul>
              <li><strong>Category:</strong> ${name}</li>
              <li><strong>Description:</strong> ${description}</li>
              <li><strong>City:</strong> ${city}</li>
              <li><strong>Street Name:</strong> ${streetName}</li>
              <li><strong>Street Number:</strong> ${streetNumber}</li>
              <li><strong>ZIP Code:</strong> ${zipCode}</li>
              <li><strong>Urgency:</strong> ${urgency}</li>
              <li><strong>Status:</strong> ${status}</li>
              <!-- Add more report details if needed -->
            </ul>
          `
        };

        transporter.sendMail(dynamicMailOptions, (error, info) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });


        res.redirect('/admin');
      }
    }
  }
  catch (err) {
    console.log(err);
  }
});

router.get('/admin/delete/:reportId', async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.session.user_id
    }).select('+isAdmin').exec();

    if (user === null) {
      res.redirect('/');
    } else {
        if (req.session.isAdmin == undefined) {
          res.redirect('/');
        } 
        else {
          const reportId = req.params.reportId;
          await Report.findByIdAndRemove(reportId);
          res.redirect('/admin');
        }
    }
  } catch (err) {
    console.log(err);
  }
});


export { router };