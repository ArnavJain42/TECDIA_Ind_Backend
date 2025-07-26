const Application = require('../models/Application');
const generatePIN = require('../utils/PINGenerator');
const sendMail = require('../utils/mailer');

// ✅ Apply for a Job

exports.apply = async (req, res) => {
  const { name, email, phone, position, resumeLink, additionalQuery } = req.body;

  // Check for duplicate email
  const existing = await Application.findOne({ email });
  if (existing) return res.status(400).json({ message: 'You have already applied using this email!' });

  // Generate PIN and expiration
  const PIN = generatePIN();
  const PINExpires = Date.now() + 15 * 24 * 60 * 60 * 1000;

  // Try sending mail first
  try {
    await sendMail(
      email,
      'Your Application PIN',
      `Thank you for applying!\n\nYour PIN is: ${PIN}\n\nUse this PIN to track your application status. Valid for 15 days.`
    );
  } catch (error) {
    return res.status(400).json({ message: 'Failed to send email. Please check if the email address exists.' });
  }

  // Only save to DB if email is sent successfully
  const application = await Application.create({
    name,
    email,
    phone,
    position,
    resumeLink,
    additionalQuery,
    PIN,
    PINExpires
  });

  res.status(201).json({ message: 'Application submitted successfully. PIN sent to email.' });
};


// ✅ Check Application Status using Email + PIN
exports.checkStatus = async (req, res) => {
  const { email, PIN } = req.body;

  const application = await Application.findOne({ email });
  if (!application || application.PIN !== PIN || Date.now() > application.PINExpires) {
    return res.status(400).json({ message: 'Invalid or expired PIN' });
  }

  res.status(200).json({
    status: application.status,
    name: application.name,
    email: application.email,
    phone: application.phone,
    position: application.position,
    resumeLink: application.resumeLink,
    additionalQuery: application.additionalQuery
  });
};

// ✅ Get All Applications (Admin)
exports.getAll = async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
};

// ✅ Update Application Status (Admin)
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updated = await Application.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) return res.status(404).json({ message: 'Application not found' });

  res.json({ message: 'Status updated successfully', application: updated });
};
