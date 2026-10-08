# Monochrome TCG

Proyecto escolar de tienda web hecho con HTML, CSS y JavaScript.

## Estructura

```text
outputs/
├── index.html
├── login.html
├── tienda.html
├── carrito.html
├── pago.html
├── css/
│   └── estilos.css
└── img/
    └── producto.jpg
```

## Uso

Abre `index.html` en el navegador para ver el inicio de Monochrome TCG. El menú superior permite volver a Inicio, ver el producto y abrir Iniciar sesión. Desde `login.html` se puede iniciar sesión o cambiar a Registrarse. Al registrarse se crea una cuenta local.

La tienda presenta Pokémon TCG: 30TH Celebration Elite Trainer Box por **$1,799.00 MXN**, con descripción, imagen, características y un carrito demostrativo. El carrito permite ajustar unidades y continuar a `pago.html` para capturar dirección, elegir un método de pago y confirmar un pedido de demostración.

El carrito y el acceso a carrito/pago requieren una sesión iniciada. Si falta la sesión, la página de acceso devuelve al usuario al paso que intentaba abrir después de iniciar sesión. La autenticación y compra son simulaciones del lado del navegador. Las cuentas se guardan en `localStorage` sin cifrado; no se comprueban en un servidor ni se procesan pagos/envíos reales. No uses contraseñas reales ni datos bancarios.
