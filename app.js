// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the port
const PORT = process.env.PORT || 5000;

// POST route to handle form submission
app.post('/submit-lead', async (req, res) => {
  const leadData = req.body;

  // Prepare data to send to Convoso API
  const convosoData = {
    first_name: leadData.first_name,
    last_name: leadData.last_name,
    zip: leadData.zip,
    address1: leadData.address,
    email: leadData.email,
    phone_number: leadData.Primary_Phone,
    dob: `${leadData.dob_year}-${leadData.dob_month}-${leadData.dob_day}`,
    consent: leadData.consent ? "Yes" : "No",
    publisher: "YourPublisherName", // Adjust as needed
    adaptor_id: "", // Your adaptor ID
    list_id: "9733", // Your list ID
    check_dup: "0",
    check_dup_archive: "0",
    check_dnc: "0",
    check_wireless: "0",
    hopper: "1",
    hopper_priority: "99",
    hopper_expires_in: "0",
    update_if_found: "",
    update_order_by_last_called_time: "DESC",
    phone_code: "1", // Adjust as needed
    created_by: "", // Adjust as needed
    gender: "", // Adjust as needed
    country: "", // Adjust as needed
    note: "", // Adjust as needed
  };

  try {
    // Make POST request to Convoso API
    const response = await fetch('https://api.convoso.com/v1/leads/insert?auth_token=sg19yks0iek24aeebmmgebhsuwxsmpd4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(convosoData),
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Lead submitted successfully', result });
    } else {
      res.status(500).json({ message: 'Failed to submit lead', result });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
