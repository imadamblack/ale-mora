import { useState } from 'react';

export default function Faqs() {
  const [faqOpen, setFaqOpen] = useState(0);

  const questions = [
    {
      q: "¿Cuánto cuesta mejorar mi sonrisa?",
      a: "Depende de tu caso. Siempre te explicamos los costos con claridad, sin letras chiquitas."
    },
    {
      q: "¿Cómo sé qué tratamiento necesito?",
      a: "En tu valoración usamos diagnóstico digital con inteligencia artificial y te mostramos qué opciones se adaptan mejor a ti."
    },
    {
      q: "¿Cuánto tiempo tardan los tratamientos?",
      a: "Depende de lo que necesites. Siempre te diremos cuánto tomará tu tratamiento y en cuánto tiempo vas a ver resultados."
    },
    {
      q: "¿Los procedimientos son seguros?",
      a: "Sí, totalmente. Usamos tecnología de vanguardia y materiales de alta calidad."
    },
    {
      q: "¿Puedo hacer todo por WhatsApp?",
      a: "Sí. Puedes agendar tu cita, resolver dudas y dar seguimiento a tu tratamiento directamente por WhatsApp. Estamos disponibles 24/7 para ti."
    }
  ];


  return (
    <section className='py-12'>
      <div className='container'>
        {questions.map((q, i) =>
          <div key={`faq-${i}`} className="w-full shadow-sm mb-2">
            <p
              id={i}
              className="w-full p-4 font-bold bg-white mb-0 cursor-pointer rounded-lg border border-gray-200"
              onClick={(e) => setFaqOpen(e.target.id)}
            >
              <span className="font-bold mr-4 text-brand-1">›</span>{q.q}
            </p>
            <p className={`${faqOpen == i ? 'flex' : 'hidden'} bg-gray-50 p-12`}>
              {q.a}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}