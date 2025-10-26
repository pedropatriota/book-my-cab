import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, MapPin, Luggage, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const bookingSchema = z.object({
  meetingLocation: z.string().min(3, "Local de encontro é obrigatório"),
  numberOfBags: z.string().min(1, "Quantidade de malas é obrigatória"),
  destination: z.string().min(3, "Destino é obrigatório"),
  dateTime: z.string().min(1, "Data e horário são obrigatórios"),
  phone: z.string().min(9, "Telefone de contacto é obrigatório"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      meetingLocation: "",
      numberOfBags: "",
      destination: "",
      dateTime: "",
      phone: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      // Format date for Google Calendar
      const bookingDate = new Date(data.dateTime);
      const startDate = bookingDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const endDate = new Date(bookingDate.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      
      // Create Google Calendar link
      const calendarTitle = encodeURIComponent(`Transfer: ${data.meetingLocation} → ${data.destination}`);
      const calendarDetails = encodeURIComponent(
        `Local de Encontro: ${data.meetingLocation}\n` +
        `Destino: ${data.destination}\n` +
        `Malas: ${data.numberOfBags}\n` +
        `Telefone: ${data.phone}`
      );
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&dates=${startDate}/${endDate}&details=${calendarDetails}`;

      // Create WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `🚕 *Nova Reserva de Transfer*\n\n` +
        `📍 *Local de Encontro:* ${data.meetingLocation}\n` +
        `🧳 *Malas:* ${data.numberOfBags}\n` +
        `🎯 *Destino:* ${data.destination}\n` +
        `📅 *Data/Hora:* ${bookingDate.toLocaleString('pt-PT')}\n` +
        `📱 *Telefone:* ${data.phone}`
      );
      const whatsappNumber = "351913809375"; // TODO: Replace with actual taxi driver number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      // Open both links
      window.open(googleCalendarUrl, '_blank');
      window.open(whatsappUrl, '_blank');

      toast.success("Reserva enviada com sucesso!", {
        description: "Links do WhatsApp e Google Calendar foram abertos.",
      });
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <Input
                    type="datetime-local"
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
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-[hsl(35,91%,55%)] hover:opacity-90 transition-opacity shadow-[var(--shadow-soft)]"
          >
            {isSubmitting ? "A enviar..." : "Confirmar Reserva"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
