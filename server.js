require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: ['https://mkcup2.github.io', 'http://localhost:3000', 'https://www.mkcup2.com', 'https://mkcup2.com'],
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Basic route for checking if server is running
app.get('/', (req, res) => {
    console.log('GET / - Checking server status');
    res.send('Server is running!');
});

// Test route for checking email configuration
app.get('/test-email', (req, res) => {
    console.log('GET /test-email - Testing email configuration');
    res.send({
        emailUser: process.env.EMAIL_USER ? 'Email user is set' : 'Email user is missing',
        emailPass: process.env.EMAIL_PASS ? 'Email password is set' : 'Email password is missing'
    });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    console.log('POST /api/contact - Received contact form submission');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    const {
        firstName,
        lastName,
        email,
        phone,
        service,
        budget,
        timeline,
        message
    } = req.body;

    if (!firstName || !lastName || !email || !message) {
        console.log('Missing required fields');
        return res.status(400).json({
            message: 'Brakuje wymaganych pól',
            missing: { firstName: !firstName, lastName: !lastName, email: !email, message: !message }
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log('Attempting to send email...');
        
        const mailOptions = {
            from: `"Formularz kontaktowy" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Nowa wiadomość od ${firstName} ${lastName}`,
            html: `
                <h2>Nowa wiadomość z formularza kontaktowego</h2>
                <p><strong>Imię i nazwisko:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefon:</strong> ${phone || 'Nie podano'}</p>
                <p><strong>Usługa:</strong> ${service || 'Nie wybrano'}</p>
                <p><strong>Budżet:</strong> ${budget || 'Nie określono'}</p>
                <p><strong>Termin realizacji:</strong> ${timeline || 'Nie określono'}</p>
                <h3>Wiadomość:</h3>
                <p>${message}</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        res.status(200).json({
            message: 'Wiadomość została wysłana pomyślnie',
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            message: 'Wystąpił błąd podczas wysyłania wiadomości',
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('CORS configuration:', {
        origins: ['https://mkcup2.github.io', 'http://localhost:3000', 'https://www.mkcup2.com', 'https://mkcup2.com']
    });
}); 