ran;import { BookingForm } from "@/components/BookingForm";
import { Car, Shield, Clock, Star, MapPinCheckInside } from "lucide-react";
import heroImage from "@/assets/taxi-hero.jpg";
import Tour from "@/components/Tour"
 
const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[hsl(45,93%,97%)]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            A sua segurança é a nossa viagem
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Encontre o táxi ideal para o seu grupo. Opções de 5, 7 e 9 lugares.
          </p>
          <a
            href="#booking"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-[var(--shadow-soft)] hover:scale-105"
          >
            Reservar Agora
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Car className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Frota Moderna</h3>
            <p className="text-muted-foreground text-sm">
              Veículos confortáveis e bem equipados
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Segurança Total</h3>
            <p className="text-muted-foreground text-sm">
              Motoristas profissionais
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Pontualidade</h3>
            <p className="text-muted-foreground text-sm">
              Sempre no horário combinado
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">5 Estrelas</h3>
            <p className="text-muted-foreground text-sm">
              Avaliação máxima dos clientes
            </p>
          </div>
        </div>

        {/* Booking Form Section */}
        <div id="booking" className="scroll-mt-20">
          <BookingForm />
        </div>        
      </section>

     
        <Tour/>


      {/* Footer */}
      <footer className="bg-foreground text-background py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            © 2025 Transfer Premium. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
