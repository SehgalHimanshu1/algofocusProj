/* homepage controller */
const home = function (req, res, next){
  res.render('index', {title: 'Express'});
};

/* form controller */
const form = function (req, res, next){
  res.render('generic-form', {title: 'user-form'});
};

/* form save controller */
const formSave = function (req, res, next){
  if ((req.body.phone).match(/\d{10}/)){
    const userDetails = new detailsModel({
        name: req.body.name, email: req.body.email, dob: req.body.dob  });
    userDetails.save(function (error){
      if (error){
        console.log('mongoose save error', error);
      } else {
        console.log('mogoose data saved');
      }
    });
    res.render('form-data-received', {auth: true, data: req.body});
  } else {
    res.render('form-data-received', {auth: false});
  }
};

module.exports = {home, form, formSave}
