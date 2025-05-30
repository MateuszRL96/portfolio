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
app.get('/test-email', async (req, res) => {
    console.log('GET /test-email - Testing email configuration');
    console.log('Environment variables status:', {
        EMAIL_USER_SET: !!process.env.EMAIL_USER,
        EMAIL_PASS_SET: !!process.env.EMAIL_PASS,
        EMAIL_USER_LENGTH: process.env.EMAIL_USER?.length,
        EMAIL_PASS_LENGTH: process.env.EMAIL_PASS?.length
    });

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            debug: true // Show debug output
        });

        console.log('Testing email connection...');
        await transporter.verify();
        console.log('Email connection successful!');

        res.json({
            status: 'success',
            message: 'Email configuration is correct',
            config: {
                emailUser: process.env.EMAIL_USER ? 'Set correctly' : 'Missing',
                emailPass: process.env.EMAIL_PASS ? 'Set correctly' : 'Missing'
            }
        });
    } catch (error) {
        console.error('Email configuration error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Email configuration error',
            error: error.message,
            stack: error.stack
        });
    }
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
        console.log('Creating email transporter...');
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            debug: true // Show debug output
        });

        console.log('Verifying email configuration...');
        await transporter.verify();
        console.log('Email configuration verified successfully');

        console.log('Preparing email content...');
        const mailOptions = {
            from: `"Formularz kontaktowy" <${process.env.EMAIL_USER}>`,
            to: 'mati.kulec13@gmail.com',
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

        console.log('Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        res.status(200).json({
            message: 'Wiadomość została wysłana pomyślnie',
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            command: error.command
        });

        res.status(500).json({
            message: 'Wystąpił błąd podczas wysyłania wiadomości',
            error: error.message,
            details: {
                code: error.code,
                command: error.command
            }
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment check:', {
        EMAIL_USER_SET: !!process.env.EMAIL_USER,
        EMAIL_PASS_SET: !!process.env.EMAIL_PASS
    });
}); 