require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: ['https://mkcup2.github.io', 'http://localhost:3000', 'https://www.mkcup2.com'],
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use(express.json());

// Basic route for checking if server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test email configuration
app.get('/test-email', async (req, res) => {
    try {
        await transporter.verify();
        res.send('Email configuration is correct!');
    } catch (error) {
        console.error('Email configuration error:', error);
        res.status(500).send('Email configuration error: ' + error.message);
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    console.log('Otrzymano żądanie:', req.body); // Debugging

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

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ 
            message: 'Brakuje wymaganych pól',
            missing: {
                firstName: !firstName,
                lastName: !lastName,
                email: !email,
                message: !message
            }
        });
    }

    try {
        console.log('Konfiguracja email:', {
            user: process.env.EMAIL_USER,
            passLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
        }); // Debugging (nie pokazujemy pełnego hasła)

        // Email content
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

        console.log('Próba wysłania maila...'); // Debugging

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Mail wysłany:', info); // Debugging

        res.status(200).json({ 
            message: 'Wiadomość została wysłana pomyślnie',
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Szczegóły błędu:', error); // Debugging
        res.status(500).json({ 
            message: 'Wystąpił błąd podczas wysyłania wiadomości',
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
    console.log('Konfiguracja CORS:', {
        origins: ['https://mkcup2.github.io', 'http://localhost:3000', 'https://www.mkcup2.com']
    });
}); 