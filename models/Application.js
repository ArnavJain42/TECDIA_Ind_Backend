const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String, // 📞 New field for applicant's phone number
  position: String,
  resumeLink: String,
  additionalQuery: String, // 💬 New field for applicant's query or message
  status: { type: String, default: 'Pending' },
  PIN: String,
  PINExpires: Date
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
