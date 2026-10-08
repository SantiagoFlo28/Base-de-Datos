# Monochrome TCG

Proyecto escolar de tienda web hecho con HTML, CSS y JavaScript.

## Estructura

```text
outputs/
├── index.html
├── login.html
├── tienda.html
├── css/
│   └── estilos.css
└── img/
    └── producto.jpg
```

## Uso

Abre `index.html` en el navegador para ver el inicio de Monochrome TCG. El menú superior permite volver a Inicio, ver el producto y abrir Iniciar sesión. Desde `login.html` se puede iniciar sesión o cambiar a Registrarse. Al registrarse se crea una cuenta local; al iniciar sesión con esa cuenta se avanza a `tienda.html`.

La tienda presenta Pokémon TCG: 30TH Celebration Elite Trainer Box por **$1,799.00 MXN**, con descripción, imagen, características y un carrito demostrativo.

El acceso y carrito son simulaciones del lado del navegador. Las cuentas se guardan en `localStorage` sin cifrado, no se comprueban en un servidor y no se procesan pagos; no se deben usar contraseñas reales.
