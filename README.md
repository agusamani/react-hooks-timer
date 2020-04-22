### React Hooks Timer App

Haremos una App sencilla, utilizando los nuevos features de React, __Hooks__, que nos permiten el uso de manejos de estados y llevar a cabo efectos secundarios en nuestros componentes funcionales.

Nuestra App sera un Contador y Cuenta regresiva. Podremos cambiar entre ambos y escribir una cantidad de segundos para la cuentra regresiva.

Tendremos un solo componente en donde manejaremos los estados y nuestra UI. Ya tendras creado el componente `Timer.js` y `Timer.css`. Los estilos ya estarán en los files iniciales.

Comencemos:

## Paso 1

Ejecutamos `npm install` en la consola para instalar las dependencias, una vez instalamos inicializamos el proyecto con `npm start`. Se iniciara en `http://localhost:3000/`.

## Paso 2

Comenzamos a crear nuestro HTML que mostrara nuestro componente. Usamos las mismas clases, para que carguen los estilos que tendremos en `Timer.css`. Tambien pueden hacer los estilos ustedes si quieren.

```javascript
import React from 'react';

const Timer = () => {
  return (
    <div className="app">
      <div className="time">
        segundos
      </div>
      <div className="row">
        <button className="button-primary">
          Inicio
        </button>
        <button className="button-secondary">
          Reset
        </button>
      </div>
      <button className="button" onClick={changeType}>
          Contador
      </button>
      <input type="text" placeholder="Ingresa Segundos" autoComplete="off"/>
    </div>
  );
};

export default Timer;
```

Ahora que tenemos nuestra estructura casi lista podemos comenzar a agregar el Hook `useState`.

## Paso 3

Con la version 16.8 de React, los componentes funcionales tienen la habilidad de manejar ´state´ y ´life cycle methods´ que antes podiamos lograrlo solo con componentes de Clase. Comenzamos con ´useState´. Lo importamos en nuestro componente.

```javascript
import React, { useState } from 'react';
```
Como vimos anteriormente, useState es una funcion que nos devuelve un array con dos elementos. Nuestro primer elemento sera nuestro `state` y el segundo es el metodo para mutar el state. Usamos destructurion para separar cada elemnto del array. En nuestra App tendremos 3 estados diferentes:

1- Nuestros segundos, los guardaremos en un state para poder mutarlos.
2- Un estado para llevar el control de nuestro boton de Inicio y Pausa.
3- Por ultimo necesitaremos un estado para cambiar entre nuestro Contador y nuestra Cuenta Regresiva.

Nos quedaran asi:

```javascript
...

const Timer = () => {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState('Contador');
...
```

Como vemos, a cada state le pasamos nuestro valor inicial como parametro a nuestra funcion useState. Por convencion se usa al comienzo de nuestro metodo para mutar el estado la palabra `set` seguido del nombre de nuestro estado. En este caso, comenzamos nuestro contador en 0, y nuestro Timer esta en pausa por eso `activo` es false. Y por default nuestra app se iniciara como `Contador`.

## Paso 4

Comencemos a pasarle los valores iniciales del state a nuestro HTML. En lugar de pasar a mano segundos. Pasamos nuestro state `segundos`, en el boton Inicio, usamos `activo` para cambiar entre Inicio y Pausa, tambien usaremos ese state para cambiar las clases. Por ultimo en el boton `Contador` y en nuestro imput usamos el state `tipo` para mostrar el input si mi `tipo` es 'Cuenta Regresiva'


```javascript
...
  return (
    <div className="app">
      <div className="time">
        {segundos}s
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`}>
          {isActive ? 'Pausa' : 'Inicio'}
        </button>
        <button className="button">
          Reset
        </button>
      </div>
      <button className="button">
          {tipo}
      </button>
      {tipo === 'Cuenta Regresiva' && <input type="text" placeholder="Ingresa Segundos" autoComplete="off"/>}
    </div>
  );
...
```

## Paso 5

Agregamos la funcionalidad de Inicio, Pausa y Reseteo del Timer. Primero agregamos una funcion para cambiar nuestro estado `active`. La llamamos 'toggle'. Y cuando esta sea llamada cambiara el state activo.

```javascript
function toggle() {
  setActivo(!activo);
}
```
Aca estamos llamando a la function setActivo y le pasamos nuestro nuevo estado, en este caso sera el valor contrario que tenca `activo` en ese momento.
Agregamos una funcion para resetear nuestro state `segundos` y `activo`. La llamamos reset.

```javascript
function reset() {
  setSegundos(0);
  setActivo(false);
}
```
Al ejecutarse esta funcion volvemos a nuestros valores iniciales. Por ultimo, una funcion para cambiar entre 'Contador' y 'Cuenta Regresiva'.

```javascript
function cambioTipo() {
    if(tipo === 'Contador') setType('Cuenta Regresiva')
    if(tipo === 'Cuenta Regresiva') setType('Contador')
}
```

Ahora agregamos nuestros metodos a nuestro componente.

```javascript
...
  return (
    <div className="app">
      <div className="time">
        {segundos}s
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pausa' : 'Inicio'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      <button className="button" onClick={cambioTipo}>
          {tipo}
      </button>
      {tipo === 'Cuenta Regresiva' && <input type="text" placeholder="Ingresa Segundos" autoComplete="off"/>}
    </div>
  );
...
```

## Paso 5

Iniciamos nuestro Timer con el Hook `useEffect`. Como vimos anteriormente, useEffect nos permite llevar a cabo efectos secundarios en componentes funcionales. Nos ayuda a simular los ciclos de vida en los componente de clase. Si bien no son exactamente lo mismo, se comporta similar. Este Hook equivale a componentDidMount, componentDidUpdate y componentWillUnmount combinados.
Lo importamos como hicimos con useState. `useEffect` recibe un callback como primer parametro. El segundo parametro que recibe es un array con sus `dependencias`, es decir que cuando esos parametros no cambien, nuestro Hook no volvera a ejecutarse. 
Para nuestro contador usaremos el metodo `setInterval`. En lugar de iniciar nuestro Contador en la funcion toggle, usaremos `useEffect` para saber cuando `activo` es true para iniciarlo.

```javascript
...
  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'Contador') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    } 
    if (!segundos && segundos !== 0 && tipo === 'Contador') {
      clearInterval(interval);
    }
    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);
  
...
```
En primer lugar, inicializamos un nuevo intervalo con el valor null. Luego, detectamos si `activo` es true. Si es así, asignamos la variable de intervalo creada previamente a un nuevo intervalo que se dispara cada 1 segundo. Dentro del intervalo es donde incrementamos el valor de los segundos en uno.

Si el valor `activo` es falso, entonces estamos limpiando el intervalo . También estamos devolviendo clearInterval fuera del método useEffect, nuevamente, para limpiar después de nosotros mismos. Esto es equivalente a llamar a componentWillUnmount en un componente de Clase.

Vemos que nuestras `dependencias` son nuestros estados, es decir que cada vez que haya algun cambio de state, useEffect se ejecutara.

## Paso 6

Para terminar agregamos la funcionalidad de Cuenta Regresiva. Usaremos el Hook `useRef` para obtener el valor que ingresemos en el input. Este devuelve un objecto `ref` mutable. Este objeto devuelto se mantendrá persistente durante la vida completa del componente. Usamos las referencias como un modo para acceder al DOM. Primero inicializamos nuestra ref

```javascript
...
const myRef = useRef(null);
...
```
Despues agregamos nuestra `ref` en el input. Y agregamos la funcionalidad para cambiar nuestros segundos al cambiar el valor en el input

```javascript
...

function addSeconds() {
    // `current` apunta al elemento de entrada de texto montado
    let ref = myRef.current.value
    setSegundos(ref)
}
...
//...
...

<input type="text" ref={myRef} onChange={addSeconds} placeholder="Ingresa Segundos" autoComplete="off"/>

...
```

Modificamos `useEffect` para agregar la funcionalidad de 'Cuenta Regresiva'. Useremos otro `setInterval` para restar la cantidad de segundos que tengamos en nuestro state. Y otra condicion para resetear nuestro Timer al llegar a 0.

```javascript
...
  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'Contador') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    } 
    if (activo && tipo === 'Cuenta Regresiva') {
      intervalo = setInterval(() => {
        setSeconds(segundos => segundos - 1);
      }, 1000);
    }
    if (!activo && segundos !== 0 && tipo === 'Contador') {
      clearInterval(intervalo);
    }
    if (segundos === 0 && activo === 'Cuenta Regresiva') {
      reset();
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);
  
...

```

Con esto tendriamos nuestra pequeña App usando los Hooks de React!