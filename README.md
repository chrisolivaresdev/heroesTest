# Heroes SPA

Una SPA (Angular) que muestra una lista paginada de superhéroes y una vista de detalle por héroe.
Incluye animaciones, diseño con Tailwind CSS y uso de Angular Signals (`signal`/`effect`) y `inject()`.

**Características principales**
- Lista paginada de héroes con tarjetas visuales.
- Vista detalle con imagen ampliada, powerstats (barras), apariencia y biografía en español.
- Animaciones con `@angular/animations` y animaciones CSS para imágenes y barras.

**Requisitos**
- **Node.js**: versión 18 o superior recomendada.
- **npm**: versión 9 o superior recomendada.
- (Opcional) `@angular/cli` si quieres ejecutar `ng` globalmente: `npm install -g @angular/cli`.

**Instalación (desde cero)**
1. Clona el repositorio y entra en la carpeta:

```powershell
git clone <tu-repo-url>
cd heroes
```

2. Instala dependencias:

```powershell
npm install
```

3. (Si al instalar faltan pares de dependencias de `@angular/animations`, instala la versión que corresponda a tu Angular instalado. Por ejemplo si usas Angular 19.x:)

```powershell
npm install @angular/animations@19.2.17 --save
```

4. Ejecuta la aplicación en modo desarrollo:

```powershell
npm run start
# o, si prefieres: ng serve --open
```

La app estará disponible en `http://localhost:4200/`.

**Build de producción**

```powershell
ng build --configuration production
# o si tienes script en package.json:
npm run build
```

Los archivos de salida se generarán en `dist/`.
