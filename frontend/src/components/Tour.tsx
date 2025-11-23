import vista from "@/assets/vista.jpg"
import nau from "@/assets/nau.jpg"
import caxinas from "@/assets/caxinas.webp"
import passadico from "@/assets/passadico.jpg"
import aqueduto from "@/assets/aqueduto.jpeg"

export default function VilaDoCondeOverview() {
    return (
      <section className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-md md:p-10">
        {/* Header */}
        <header className="mb-8 grid gap-6 md:grid-cols-[1.5fr,1fr] md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Conheça Vila do Conde
            </h1>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Cidade costeira na foz do rio Ave, conhecida pela ligação ao mar,
              pelo património histórico, pelas tradições artesanais e por uma
              linha de praias extensas.
            </p>
          </div>
  
          {/* Imagem geral da cidade / costa */}
          <div className="relative h-40 w-full overflow-hidden rounded-xl md:h-44">
            <img
              src={vista}
              alt="Vista aérea de Vila do Conde com o rio Ave e a costa atlântica"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white">
              Vista aérea
            </span>
          </div>
        </header>
  
        <div className="grid gap-6 md:grid-cols-2">
          {/* História */}
          <article className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-lg">
                🏛️
              </span>
              <h2 className="text-lg font-semibold text-slate-900">
                História e património
              </h2>
            </div>
  
            <p className="text-sm text-slate-600">
              Com mais de mil anos, Vila do Conde já era referida em 953 como{" "}
              <strong>Villa de Comite</strong>. Cresceu ligada ao mar e à época
              dos Descobrimentos, o que explica o seu património monumental.
            </p>
  
            <ul className="space-y-1 text-sm text-slate-600">
              <li>
                • <strong>Convento de Santa Clara</strong> e o aqueduto que o
                abastecia, ícones da paisagem local.
              </li>
              <li>
                • <strong>Nau Quinhentista</strong>, réplica de uma nau da época
                dos Descobrimentos aberta a visitas.
              </li>
              <li>
                • <strong>Fortes históricos</strong>, como o Forte de São João
                Baptista e o de Nossa Senhora da Conceição.
              </li>
              <li>
                • <strong>Igreja Matriz</strong>, construída entre os séculos XV e
                XVI, centro político e religioso da cidade.
              </li>
            </ul>
  
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative h-28 overflow-hidden rounded-xl">
                <img
                  src={aqueduto}
                  alt="Aqueduto de Santa Clara em Vila do Conde"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
                  Aqueduto e Convento de Santa Clara
                </span>
              </div>
              <div className="relative h-28 overflow-hidden rounded-xl">
                <img
                  src={nau}
                  alt="Nau Quinhentista atracada no rio Ave em Vila do Conde"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
                  Nau Quinhentista
                </span>
              </div>
            </div>
          </article> 
         
        
          {/* Natureza e praias */}
          <article className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-lg">
                🏖️
              </span>
              <h2 className="text-lg font-semibold text-slate-900">
                Praias e beleza natural
              </h2>
            </div>
  
            <p className="text-sm text-slate-600">
              Vila do Conde combina <strong>praias de areia extensa</strong>, a
              foz do rio Ave e áreas protegidas como a{" "}
              <strong>Reserva Ornitológica de Mindelo</strong>, com dunas,
              passadiços e observação de aves.
            </p>
  
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative h-28 overflow-hidden rounded-xl">
                <img
                  src={caxinas}
                  alt="Praia das Caxinas com areia e zona urbana ao fundo"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
                  Praia das Caxinas
                </span>
              </div>
              <div className="relative h-28 overflow-hidden rounded-xl">
                <img
                  src={passadico}
                  alt="Passadiços na Reserva Ornitológica de Mindelo em Vila do Conde"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
                  Reserva de Mindelo
                </span>
              </div>
            </div>  
            <ul className="mt-2 space-y-1 text-xs text-slate-600">
              <li>• Praias para banhos, caminhadas e desportos aquáticos</li>
              <li>• Passeio marítimo e ribeirinho junto ao rio Ave</li>
              <li>• Trilhos de natureza e observação de aves na zona protegida</li>
            </ul>
          </article>
        </div>       
      </section>
    );
  }
  