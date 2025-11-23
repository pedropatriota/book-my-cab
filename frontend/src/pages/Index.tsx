import { BookingForm } from "@/components/BookingForm";
import { Car, Shield, Clock, Star, MapPinCheckInside } from "lucide-react";
import heroImage from "@/assets/taxi-hero.jpg";

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
            Transfer Premium
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Viaje com conforto e segurança. Serviço profissional de táxi para
            todas as suas necessidades.
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
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

        {/* Tour in Vila do Conde */}
        <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPinCheckInside className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Turismo em Vila do Conde</h3>
            <p className="text-muted-foreground text-md">
             Vila do Conde é uma cidade costeira no norte de Portugal, conhecida pela sua rica história, tradições culturais, gastronomia diversificada e praias de beleza natural. 
História
Com mais de mil anos de história, Vila do Conde era referida já em 953 como Villa de Comite. A sua trajetória está intimamente ligada ao mar e à era dos Descobrimentos. Alguns dos seus marcos históricos mais importantes incluem: 
Convento de Santa Clara: Um dos mais notáveis edifícios da cidade, onde a arte da doçaria conventual foi aperfeiçoada. O convento e o aqueduto que o servia são ícones da paisagem vilacondense.
Nau Quinhentista: Uma réplica de uma embarcação da época dos Descobrimentos que pode ser visitada, relembrando a forte ligação da cidade ao mar.
Fortalezas Históricas: A cidade e os arredores possuem várias fortalezas, como o Forte de São João Batista e a Fortaleza Nossa Senhora da Conceição, construídas para defender o território de invasores e piratas.
Igreja Matriz: Um ponto central da cidade, erguida entre os séculos XV e XVI, que marcou o centro político e religioso da localidade. 
Cultura e tradições
A cultura de Vila do Conde é fortemente influenciada pela sua história marítima e pelas suas tradições artesanais: 
Rendas de Bilros: Uma arte artesanal secular e ex-líbris da cidade. O Museu das Rendas de Bilros de Vila do Conde preserva e divulga este património cultural imaterial.
Festividades Marítimas: A vida cultural da cidade está cheia de festas e celebrações ligadas ao mar, incluindo a Festa de São Pedro, que celebra o santo padroeiro dos pescadores.
Eventos Culturais: A cidade acolhe eventos vibrantes, como o Festival Internacional de Cinema Curtas Metragens, que atrai visitantes de todo o mundo. 
Gastronomia
A culinária vilacondense reflete a sua localização entre o mar e a rica região agrícola: 
Peixe e Marisco: A proximidade do mar garante a frescura de peixes e mariscos. Destaque para a "petinga à moda das Caxinas" e outros pratos de peixe fresco.
Carne e Grelhados: Não faltam pratos de carne, como o cabrito assado, e as grelhadas, que podem ser apreciadas em restaurantes locais.
Doces Conventuais: Uma tradição secular que teve no Convento de Santa Clara um grande impulsionador. Os doces de ovos e a rosca de pão doce ou folar de Páscoa são especialidades locais.
Restaurantes Típicos: Lugares como a Adega da Vila e o Praça Velha oferecem uma experiência autêntica, com pratos de cozinha regional portuguesa e um ambiente acolhedor. 
Beleza natural
Vila do Conde oferece um cenário natural diversificado, onde a foz do rio Ave se encontra com o Oceano Atlântico: 
Praias: A cidade possui uma costa extensa com várias praias de areia, ideais para banhos de sol, desportos aquáticos e caminhadas. Entre as mais conhecidas estão a Praia das Caxinas e a Praia da Areia.
Passeio Marítimo: Um agradável passeio ribeirinho e marítimo, onde se pode admirar a vista do mar e dos edifícios históricos.
Reserva Ornitológica de Mindelo: Um dos primeiros parques ornitológicos de Portugal, um santuário para diversas espécies de aves que oferece trilhos de natureza.
Paisagem Costeira: A paisagem combina as dunas e a vegetação costeira com as áreas urbanas e de pesca, criando um ambiente tranquilo e revitalizante.
            </p>
          </div>
        </div>
        
      </section>

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
