import CardServicio from "./Card";

export default function CardsEscritorio({ servicios, esVisible }) {
  const fila1 = servicios.slice(0, 2);
  const fila2 = servicios.slice(2, 5);

  return (
    <div className="flex flex-col gap-2 w-full h-full">

      <div className="flex gap-2 flex-1">
        {fila1.map((s, i) => (
          <div key={s.titulo} className="flex-1">
            <CardServicio
              {...s}
              index={i}
              esVisible={esVisible}
              desdeIzquierda={false}
            />
          </div>
        ))}
      </div>


      <div className="flex gap-2 flex-1">
        {fila2.map((s, i) => (
          <div key={s.titulo} className="flex-1">
            <CardServicio
              {...s}
              index={i + 2}
              esVisible={esVisible}
              desdeIzquierda={false}
            />
          </div>
        ))}
      </div>

    </div>
  );
}