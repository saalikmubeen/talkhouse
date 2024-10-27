const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if user exists
    const userExists = await User.exists({
      email: email.toLowerCase(),
    });

    if (userExists) {
      return res.status(409).send('E-mail already in use.');
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    const userDoc = {
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };

    const saalik = await User.findOne({
      email: 'salikmubien@gmail.com',
    });

    if (saalik) {
      userDoc.friends = [saalik._id];
    }

    // create user document and save in database
    const user = await User.create(userDoc);

    if (saalik) {
      saalik.friends = [...saalik.friends, user._id];
      await saalik.save();
    }

    // create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '15d',
      }
    );

    res.status(201).json({
      userDetails: {
        _id: user._id,
        email: user.email,
        token: token,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(500).send('Error occured. Please try again');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res
        .status(400)
        .send('Invalid credentials. Please try again');
    }

    const passwordsMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordsMatch) {
      return res
        .status(400)
        .send('Invalid credentials. Please try again');
    }

    // send new token
    const token = jwt.sign(
      {
        userId: user._id,
        email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '15d',
        // expiresIn: 60,
      }
    );

    return res.status(200).json({
      userDetails: {
        _id: user._id,
        email: user.email,
        token: token,
        username: user.username,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .send('Something went wrong. Please try again');
  }
};

const subscribe = async (req, res) => {
  const { endpoint, keys } = req.body;
  const user = req.user;

  console.log(req.body);

  const userDoc = await User.findById(user.userId);
  if (!userDoc) {
    return res.status(404).send('User not found');
  }

  const pushSubscription = {
    endpoint,
    keys,
  };

  // check if the subscription already exists

  try {
    const existingSubscription = userDoc.pushSubscription.find(
      (sub) => sub.endpoint === endpoint
    );

    if (existingSubscription) {
      return res.status(200).send('Subscription already exists');
    }
  } catch (err) {
    return res
      .status(500)
      .send('Something went wrong while saving the subscription');
  }

  try {
    userDoc.pushSubscription.push(pushSubscription);
    await userDoc.save();
  } catch (err) {
    return res
      .status(500)
      .send('Something went wrong while saving the subscription');
  }

  res.status(200).send('Subscription saved');
};

const unsubscribe = async (req, res) => {
  const { endpoint } = req.body;
  const user = req.user;

  console.log(req.body);

  const userDoc = await User.findById(user.userId);

  if (!userDoc) {
    return res.status(404).send('User not found');
  }

  const subscription = userDoc.pushSubscription.find(
    (sub) => sub.endpoint === endpoint
  );

  if (!subscription) {
    return res.status(404).send('Subscription not found');
  }

  userDoc.pushSubscription = userDoc.pushSubscription.filter(
    (sub) => sub.endpoint !== endpoint
  );

  try {
    await userDoc.save();
  } catch (err) {
    return res
      .status(500)
      .send('Something went wrong while removing the subscription');
  }

  console.log('Subscription removed');

  res.status(200).send('Subscription removed');
};

module.exports = {
  login,
  register,
  subscribe,
  unsubscribe,
};
