import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, MapPin, Luggage, Phone, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { gapi } from "gapi-script";

// Get credentials from environment variables
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const bookingSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  meetingLocation: z.string().min(3, "Local de encontro é obrigatório"),
  numberOfBags: z.string().min(1, "Quantidade de malas é obrigatória"),
  destination: z.string().min(3, "Destino é obrigatório"),
  dateTime: z.string().min(1, "Data e horário são obrigatórios"),
  phone: z.string().min(9, "Telefone de contacto é obrigatório"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      meetingLocation: "",
      numberOfBags: "",
      destination: "",
      dateTime: "",
      phone: "",
    },
  });

  // Initialize Google API
  useEffect(() => {
    function start() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(setIsSignedIn);
        })
        .catch((error) => {
          console.error("Error initializing Google API:", error);
        });
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const createCalendarEvent = async (data: BookingFormData) => {
    const bookingDate = new Date(data.dateTime);
    const endDate = new Date(bookingDate.getTime() + 60 * 60 * 1000);

    const event = {
      summary: `Transfer: ${data.name} - ${data.meetingLocation} → ${data.destination}`,
      description:
        `Cliente: ${data.name}\n` +
        `Local de Encontro: ${data.meetingLocation}\n` +
        `Destino: ${data.destination}\n` +
        `Malas: ${data.numberOfBags}\n` +
        `Telefone: ${data.phone}`,
      start: {
        dateTime: bookingDate.toISOString(),
        timeZone: "Europe/Lisbon",
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: "Europe/Lisbon",
      },
      location: data.meetingLocation,
    };

    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
      return response.result;
    } catch (error) {
      console.error("Error creating calendar event:", error);
      throw error;
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      const bookingDate = new Date(data.dateTime);

      // Create event in Google Calendar automatically
      if (isSignedIn) {
        await createCalendarEvent(data);
        toast.success("Evento criado no Google Calendar!");
      } else {
        toast.error("Por favor, faça login no Google primeiro");
        setIsSubmitting(false);
        return;
      }

      // Create WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `🚕 *Nova Reserva de Transfer*\n\n` +
          `👤 *Cliente:* ${data.name}\n` +
          `📍 *Local de Encontro:* ${data.meetingLocation}\n` +
          `🧳 *Malas:* ${data.numberOfBags}\n` +
          `🎯 *Destino:* ${data.destination}\n` +
          `📅 *Data/Hora:* ${bookingDate.toLocaleString("pt-PT")}\n` +
          `📱 *Telefone:* ${data.phone}`
      );
      const whatsappNumber = "351913809375";
      const url = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      setWhatsappUrl(url);

      // Try to open WhatsApp
      setTimeout(() => {
        const whatsappWindow = window.open(url, "_blank");

        if (!whatsappWindow) {
          toast.error("Pop-up bloqueado!", {
            description: "Use o botão abaixo para abrir o WhatsApp.",
          });
        } else {
          toast.success("Reserva enviada com sucesso!", {
            description: "Evento adicionado ao calendário e WhatsApp aberto.",
          });
        }
      }, 500);

      form.reset();
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Erro ao enviar reserva", {
        description: "Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-2xl shadow-[var(--shadow-card)] p-8 border border-border">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Reserve o Seu Transfer
        </h2>
        <p className="text-muted-foreground">
          Preencha o formulário e receba confirmação imediata
        </p>
      </div>

      {!isSignedIn && (
        <div className="mb-6">
          <Button
            type="button"
            onClick={handleSignIn}
            variant="outline"
            className="w-full"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Conectar Google Calendar
          </Button>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Nome Completo
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: João Silva"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meetingLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Local de Encontro
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Aeroporto de Lisboa, Terminal 1"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfBags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-primary" />
                  Quantidade de Malas
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Ex: 2"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Destino
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Rua Augusta, Lisboa"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Data e Horário
                </FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Telefone de Contacto
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Ex: +351 912 345 678"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting || !isSignedIn}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-[hsl(35,91%,55%)] hover:opacity-90 transition-opacity shadow-[var(--shadow-soft)]"
          >
            {isSubmitting ? "A enviar..." : "Confirmar Reserva"}
          </Button>
        </form>
      </Form>

      {whatsappUrl && (
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={() => window.open(whatsappUrl, "_blank")}
          >
            📱 Abrir WhatsApp Manualmente
          </Button>
        </div>
      )}
    </div>
  );
};
