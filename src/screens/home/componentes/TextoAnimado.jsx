
import Letras from "./Letras";


export default function TextoAnimado({ text, isExiting = false, ritmos = [], className="" }) {
  const letras = text.split("");
  
  const ritmosPorDefecto = [0.6, 0.8, 1.2, 0.7, 0.9, 1.5, 0.5, 1.1, 0.75];
  const ritmosFinal = ritmos.length === letras.length ? ritmos : ritmosPorDefecto;

  return (
    <div className="">
      {letras.map((letra, index) => (
        <Letras
          key={index}
          letter={letra}
          ritmo={ritmosFinal[index]}
          isExiting={isExiting}
          className={className}
        />
      ))}
    </div>
  );
}