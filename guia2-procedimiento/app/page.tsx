"use client";
import {useState} from "react";
import styles from "./page.module.css"

type Operacion = "suma" | "resta" | "multi" | "div" | "pot" | "raiz";

export default function Home() {

  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [operacion, setOperacion] = useState<string | null >(null);
  const [resultado, setResultado] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

  const calcular = (op : Operacion) : void => {
    setError(null);
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2) && op !== "raiz") {
      setError("Por favor, ingrese números válidos.");
      return;
    }
    if (op === "div" && n2 === 0) {
      setError("No se puede dividir entre cero.");
      return;
    }

    if (op === "raiz" && n1 < 0) {
      setError("No se puede calcular la raíz cuadrada de un número negativo.");
      return;
    }
    const resultados : Record<Operacion, number> = {
      suma: n1 + n2,
      resta: n1 - n2,
      multi: n1 * n2,
      div: n1 / n2,
      pot: Math.pow(n1, n2),
      raiz: Math.sqrt(n1),
    };


    setResultado((Math.round(resultados[op] * 100) / 100));

  }
  
    return (
      <main className={styles.main}>
      <div className={styles.calculadora}>
        <h2>Calculadora</h2>
        <input type="number" value={num1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNum1(e.target.value)} />
        <input type="number" value={num2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNum2(e.target.value)} />
        {(["suma","resta","multi","div","pot","raiz"] as Operacion[])
          .map(op => <button key={op} onClick={() => calcular(op)}>{op}</button>)}
        <button onClick={() => { setNum1(""); setNum2(""); setResultado(null); setError(null); }}>Limpiar</button>
        {resultado && <p>Resultado: {resultado}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </main>

    ); 

}

//ejercicio 2 de la guia 2 de procedimiento
/*import styles from "./page.module.css"


interface Jugador {
  id: number; 
  nombre: string; 
  altura: string; 
  peso: string; 
}

interface  Equipo { 
  id: number ; 
  nombre: string; 
  plantilla: Jugador[]; 
}

interface EquiposProps { 
  equipos : Equipo[]; 
}

const equiposData: Equipo[] = [
  { id: 1, nombre: "Real Madrid", plantilla: [
    { id: 1, nombre: "Vinicius Jr.", altura: "1.76", peso: "73Kg" },
    { id: 2, nombre: "Jude Bellingham", altura: "1.86", peso: "75Kg" },
    { id: 3, nombre: "Kylian Mbappé", altura: "1.78", peso: "73Kg" },
  ]},
  { id: 2, nombre: "Barcelona", plantilla: [
    { id: 1, nombre: "Lamine Yamal", altura: "1.80", peso: "67Kg" },
    { id: 2, nombre: "Robert Lewandowski", altura: "1.85", peso: "81Kg" },
    { id: 3, nombre: "Gavi", altura: "1.73", peso: "68Kg" },
  ]},
];


  const Equipos =  ({equipos} : EquiposProps) => (

  <div className="{styles.container_list}"> 
    <h2>Equipos de Futbol</h2>
    {equipos.map((equipo: Equipo)=> {
       return ( <div key={equipo.id}>
          <h2>{equipo.nombre}</h2>
          <ul>
            {equipo.plantilla.map((j : Jugador)=> {

              return (
              <li key={j.id}>
                <strong>{j.nombre}</strong> - {j.altura}m . {j.peso}lb 
              </li>)
            })}
          </ul>
        </div>)

    })}

  </div>
)
 




export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Mi Aplicación de Fútbol</h1>
      <Equipos equipos={equiposData} />
    </main>
  );
}


/*import Image from "next/image";
/*import { JSX } from "react/jsx-runtime";

const element: JSX.Element = (
  <>
    <h1>Hola, Mundo!</h1>
    <h2>Son las {new Date().toTimeString()}</h2>
  </>
);

export default function Home(){

  return (
      <main className="{styles.main}">
          <div className="App">
            {element}
          </div>

      </main>

  );
}




/*
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
*/