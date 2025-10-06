# MapVX Desafío técnico

Proyecto simple para el desafío técnico de MapVX para la posición de **desarrollador frontend**.

La aplicación consiste en el manejo de mapas: creación, edición y eliminación de puntos.

Construida con ![Angular](https://angular.dev/), ![Tailwind](https://tailwindcss.com/), ![MapLibre](https://maplibre.org/), ![npm](https://www.npmjs.com/) y ![Tabler icons](https://tabler.io/icons).

## Iniciar la aplicación

Para levantar el proyecto, aségurate de:

* Tener una versión de ![Node](https://nodejs.org/en) válida (en mi caso, `v24.9.0`).
* Contar con el ![cli de Angular](https://angular.dev/tools/cli) (instalar con `npm install -g @angular/cli`).

Clona el proyecto:

```bash
git clone https://github.com/JoelFaldin/desafio-tecnico-mapvx.git
```

Instala las dependencias:

```bash
npm install
```

Inicia la aplicación:

```bash
ng serve -o
```

## Arquitectura

Este proyecto sigue una arquitectura por capas, organizada en diferentes directorios según su responsabilidad.
La estructura ayuda a aislar la lógica de los componentes y mantener imports limpios.

### Estructura de carpetas

```bash
src/app/
 ├─ components/
 ├─ core/
 │   ├─ interfaces/
 │   ├─ services/
 │   └─ utils/
 ├─ icons/
 └─ shared/
     ├─ buttons/
     ├─ modal/
     ├─ notification/
     └─ navbar/
```

* components/: Componentes de la aplicación que representan secciones o características.
* core/: Lógica principal de la aplicación:
    * interfaces/: Interfaces de TypeScript para ayudar al tipado.
    * services/: Manejan la inicialización e interacción con los mapas. Incluye un `index.ts` que re-importa cada archivo y así obtener imports limpios como:

    ```bash
    import { CheckIcon, DownloadIcon, FileIcon, InfoIcon, PinIcon, SettingsIcon } from '../../icons';
    ```

    * utils/: Funciones de utilidad, en este caso, validación usando zod.
* icons/: Diferentes componentes de Angular simples, obtenidos de ![Tabler icons](https://tabler.io/icons).
* shared/: Componentes reutilizados en toda la aplicación. Permiten el paso de información por medio de props o ![_content projection_](https://angular.dev/guide/components/content-projection)

### Posibles problemas

1. El uso de `barrels` en forma de `index.ts` en los diferentes directorios ofrecen un lugar centralizado de donde exportar componentes, pero esto a costa de mantener un archivo extra (el mismo `index.ts`). Crear nuevos componentes va ligado a actualizar este archivo, arriesgando a posibles olvidos.

2. La arquitectura por capas, a pesar de funcionar muy bien en proyectos pequeños, puede no ser ideal a medida que el proyecto crece. Es posible considerar el uso de una arquitectura por feature (features/map, features/options, etc).

3. El uso de íconos usando Tabler Icons ofrece simplicidad y facilidad de uso, pero al consistir de un componente de Angular, se agregará una detección extra en comparación a SVGs normales o una librería de íconos específicamente creada para Angular.

### Limitaciones conocidas y posibles problemas

1. Se decidió no optar por librerías de notificaciones o de _modals_. En su lugar, se usó el Angular CDK. Eso añade complejidad al proyecto, al necesitar configuraciones extras (por ejemplo, los servicios `modal-service.ts` y `notification-service.ts`).

2. Al utilizar modales con el Angular CDK, para pasar elementos a la modal se necesitó referenciar el elemento:

`
<a (click)="openModal(modalContent)" />
...
<ng-template #modalContent>
`

Esta característica hace dífcil separar los componentes. Por ejemplo, `components/navbar.ts` sufre de este problema en su template.