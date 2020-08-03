const nodemailer = require('nodemailer');

const verifyMail = async user => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'taran.developer@gmail.com',
      pass: 'mdnyymwirgqupgvx',
    },
    tls: { rejectUnauthorized: false },
  });

  return await transporter.sendMail({
    from: 'taran.developer@gmail.com',
    to: user.email,
    subject: 'Contacts app verify',
    html: `
      Please verify your email.
      <a href=${process.env.HOME_URL}/auth/verify/${user.verificationToken}>Verify</a>
    `,
  });
};

module.exports = {
  verifyMail,
};
