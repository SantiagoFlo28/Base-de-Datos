# Monochrome TCG — página de producto

Sitio estático de Monochrome TCG, hecho con HTML, CSS y JavaScript. No necesita instalar dependencias.

## Cómo abrirlo

Abre `index.html` en un navegador. También puedes servir la carpeta `outputs` con cualquier servidor estático local.

## Funcionalidades

- Portada adaptable a móvil con información, precio de $1,799.00 MXN e imagen de la 30TH Celebration Elite Trainer Box.
- Navegación entre Inicio, Perfil, Registro e Inicio de sesión; el menú móvil se abre con el botón de la esquina.
- Registro e inicio de sesión simulados con validación básica.
- El perfil muestra el usuario y la fecha en que creó su cuenta. El registro inicia la sesión automáticamente.
- El botón de compra muestra una confirmación de demostración. No procesa pagos ni crea pedidos.

Las cuentas de demostración se guardan en `localStorage` del navegador; la sesión actual se guarda en `sessionStorage`. **Este ejemplo no es apropiado para producción:** almacena contraseñas sin cifrar y cualquier persona que use el mismo navegador puede acceder a los datos locales. Para una tienda real se necesita autenticación en servidor, almacenamiento seguro y un proveedor de pagos.

## Archivos

- `index.html`: páginas y contenido.
- `styles.css`: diseño adaptable y estilos.
- `app.js`: navegación, formularios, cuenta local y botón de compra de demostración.
- `assets/`: ilustraciones originales del producto en SVG.

La imagen del producto fue proporcionada para esta página.
