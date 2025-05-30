require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: ['https://mkcup2.github.io', 'http://localhost:3000'],
    methods: ['POST'],
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

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
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

    try {
        // Email content
        const mailOptions = {
            from: email,
            to: 'mateusz.kulec@gmail.com',
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

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Wiadomość została wysłana pomyślnie' });
    } catch (error) {
        console.error('Błąd wysyłania maila:', error);
        res.status(500).json({ message: 'Wystąpił błąd podczas wysyłania wiadomości' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
}); 