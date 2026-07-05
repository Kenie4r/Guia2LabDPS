"use client";
import { useState } from "react";
import styles from "./page.module.css"



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
    { id: 3, nombre: "Cubarsi", altura: "1.73", peso: "68Kg" },
  ]},
];


  const Equipos =  ({equipos} : EquiposProps) => (
  
  <div className={styles.container__list}> 
    <h2>Equipos de Futbol</h2>
    {equipos.map((equipo: Equipo)=> {
       return ( <div key={equipo.id}>
          <h2>{equipo.nombre}</h2>
          <ul>
            {equipo.plantilla.map((j : Jugador)=> {
              const [imgJugador, setImgJugador] = useState<string | null>(null);
              let data = null;
              //vamos a hacer un fetch para poder buscar la api de THESPORTS 
             // console.log(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(j.nombre)}`); 
              fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(j.nombre)}`)

              .then(response => {
                 data = response.json();


                 data.then((data) => { 
                  setImgJugador(data?.player?.[0]?.strCutout || null);
                  console.log(imgJugador);
                 })
                console.log(data);
               
                }).then(() => {
                   //setImgJugador(data?.player?.[0]?.strCutout || null);
                  console.log(imgJugador);
                });
              return (
              <li key={j.id}>
                <strong>{j.nombre}</strong> - {j.altura}m . {j.peso}lb 
                <img src={imgJugador || undefined} alt={j.nombre} />
              </li>)
            })}
          </ul>
        </div>)

    })}

  </div>
)
 




export default function Home() {
  
   // const {imgJugador, setImgJugador} = useState<string | null>(null);

  return (
    <main className={styles.main}>
      <h1>Mi Aplicación de Fútbol</h1>
      <Equipos equipos={equiposData} />
    </main>
  );
}
