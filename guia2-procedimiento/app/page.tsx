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

  const [historial, setHistorial] = useState<String[]>([]);

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
    const resultados : Record<Operacion, () =>number> = {
      suma: ():number => {
        setHistorial([...historial, "#" + (historial.length + 1) + ": " + n1 + " + " + n2  + "= " + (n1 + n2)]);
        
        
        return n1 + n2},
      resta:
      ():number => {
        setHistorial([...historial, "#" + (historial.length + 1) + ": " + n1 + " - " + n2  + "= " + (n1 - n2)]);
        return n1 - n2;
      },
      multi: ():number => {
        setHistorial([...historial, "#" + (historial.length + 1) + ": " + n1 + " * " + n2  + "= " + (n1 * n2) ]);
        return n1 * n2;
      },
      div: ():number => {
        setHistorial([...historial, "#" + (historial.length + 1) + ": " + n1 + " / " + n2  + "= " + Math.round((n1 / n2)*100 /100)]);
        return n1 / n2;
      },
      pot: ():number => {
        setHistorial([...historial, "#" + (historial.length + 1) + ": " + n1 + " ^ " + n2  + "= " + Math.round((Math.pow(n1, n2)) * 100 /100)]);
        return Math.pow(n1, n2);
      },
      raiz: ():number => {
        setHistorial([...historial, "#" + (historial.length + 1) + ": " + "√" + n1  + "= " + Math.round((Math.sqrt(n1)) * 100 /100)]);
        return Math.sqrt(n1);
      },
    };
    console.log(historial);

    setResultado((Math.round(resultados[op]() * 100) / 100));

  }
  

  const limpiarHistorial = () => {
    setHistorial([]);
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
      <div className={styles.historial}>
        <h2>Historial <button onClick={limpiarHistorial}>Limpiar</button></h2>
        <ul>
          {historial.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </main>

    ); 

}