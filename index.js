const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Sample data for doctors
const doctors = [
  {
    id: 1,
    name: 'Dr. Smith',
    location: 'Medical Center',
    schedule: 'Evenings',
    maxPatients: 10,
  },
  {
    id: 2,
    name: 'Dr. Johnson',
    location: 'Family Clinic',
    schedule: 'Evenings',
    maxPatients: 15,
  },
];

// Sample data for appointments
const appointments = [];

// Get a list of doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// Get details of a specific doctor by ID
app.get('/api/doctors/:id', (req, res) => {
  const doctor = doctors.find((d) => d.id === parseInt(req.params.id));
  if (!doctor) return res.status(404).send('Doctor not found.');
  res.json(doctor);
});

// Book an appointment with a doctor
app.post('/api/appointments', (req, res) => {
  const { doctorId, patientName } = req.body;
  const doctor = doctors.find((d) => d.id === parseInt(doctorId));
  if (!doctor) return res.status(404).send('Doctor not found.');

  if (appointments.length >= doctor.maxPatients) {
    return res.status(400).send('Doctor is fully booked.');
  }

  appointments.push({ doctorId, patientName });
  res.json({ message: 'Appointment booked successfully.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
