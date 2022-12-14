const mongoose = require("mongoose");
const Prequalification = require('../models/Prequalification.model');
const User = require('../models/User.model');
const Review = require('../models/Review.model.js');
const Rent = require("../models/Rent.model");
const createError = require("http-errors");

module.exports.getPrequalification = (req, res, next) => {
  const { tenant } = req.params;

  Prequalification.findOne({tenant: mongoose.Types.ObjectId(tenant)})
    .then((form) => {
      res.status(201).json(form);
    })
    .catch(next);
};

module.exports.completePrequalification = (req, res, next) => {
  req.body.tenant = mongoose.Types.ObjectId(req.body.tenant);

  Prequalification.create(req.body)
    .then((formCompleted) => {
      res.status(201).json(formCompleted);
    })
    .catch(next);
};

module.exports.editPrequalification = (req, res, next) => {
  const { user } = req.params;
  const filter = { tenant: user };

  const editPrequalifications = {
    ...req.body,
    tenant: user
  };

  Prequalification.findOneAndUpdate( filter, editPrequalifications )
    .then((formCompleted) => {
      res.status(201).json(formCompleted);
    })
    .catch(next);
};

module.exports.editUserData = (req, res, next) => {
  const { user } = req.params;
  const filter = { _id: user };

  const editUser = {
    ...req.body,
    _id: user,
  };

  if (req.file) {
    editUser.image = req.file.path;
  }

  User.findOneAndUpdate(filter, editUser)
    .then((userUpdated) => {
      res.status(201).json(userUpdated);
    })
    .catch((err) => next(err));
};

module.exports.createReview = (req, res, next) => {
  req.body.user = mongoose.Types.ObjectId(req.body.user);
  req.body.property = mongoose.Types.ObjectId(req.body.property);

  Review.create(req.body)
    .then((reviewCreated) => {
      return Rent.findOneAndUpdate({ property: req.body.property }, { reviewed: true })
    })
    .then((rentedUpdated) => {
      res.status(201).json({});
    })
    .catch(next);
};

module.exports.getReviewRent = (req, res, next) => {
  const { id, user } = req.params;

  Review.find({ property: id, user })
    .then((review) => {
      res.status(201).json(review);
    })
    .catch(next);
};