import { google } from "googleapis";

const calendar = google.calendar("v3");

const getAuthClient = () => {
  return new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/calendar"]
  );
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const {
      name,
      meetingLocation,
      numberOfBags,
      destination,
      dateTime,
      phone,
    } = req.body;

    // Validate required fields
    if (!name || !meetingLocation || !destination || !dateTime || !phone) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const auth = getAuthClient();
    const bookingDate = new Date(dateTime);
    const endDate = new Date(bookingDate.getTime() + 60 * 60 * 1000); // +1 hour

    const event = {
      summary: `Transfer: ${name} - ${meetingLocation} → ${destination}`,
      description:
        `Cliente: ${name}\n` +
        `Passageiros:* ${data.passageiros}\n` +
        `Local de Encontro: ${meetingLocation}\n` +
        `Destino: ${destination}\n` +
        `Malas: ${numberOfBags}\n` +
        `Telefone: ${phone}`,
      start: {
        dateTime: bookingDate.toISOString(),
        timeZone: "Europe/Lisbon",
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: "Europe/Lisbon",
      },
      location: meetingLocation,
      colorId: "5", 
    };

    const response = await calendar.events.insert({
      auth: auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
      resource: event,
    });

    console.log("Event created:", response.data.htmlLink);

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to create booking",
    });
  }
}