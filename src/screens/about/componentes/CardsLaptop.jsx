import CardServicio from "./Card"

export function CardsLaptop({ servicios, esVisible }) {
  const arriba = servicios.slice(0, 3)
  const abajo  = servicios.slice(3, 5)

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 w-full">
        {arriba.map((s, i) => (
          <div key={s.titulo} className="flex-1 h-50">
            <CardServicio
              {...s}
              index={i}
              esVisible={esVisible}
              desdeIzquierda={true}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-5 justify-center w-full">
        {abajo.map((s, i) => (
          <div key={s.titulo} className="w-[32%] h-50">
            <CardServicio
              {...s}
              index={i}
              esVisible={esVisible}
              desdeIzquierda={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}