import express from "express";
import cors from "cors";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(cors());
app.use(express.json());

// Google Calendar setup
const calendar = google.calendar("v3");

const getAuthClient = () => {
  return new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/calendar"]
  );
};

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Create booking endpoint
app.post("/api/create-booking", async (req, res) => {
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
      colorId: "5", // Yellow color for visibility
    };

    const response = await calendar.events.insert({
      auth: auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
      resource: event,
    });

    console.log("Event created:", response.data.htmlLink);

    res.json({
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
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
