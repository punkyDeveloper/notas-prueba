import React from 'react';
import Nav from './assets/componets/componentesAdicionales/nav.tsx'
import Crearnota from "./assets/componets/nota/Crear.tsx";
import Notas from "./assets/componets/nota/traer.tsx"
export default function Example() {
        
    return (

        <>
                <Nav/>


                <Crearnota />

                <Notas />


        </>
        );
}