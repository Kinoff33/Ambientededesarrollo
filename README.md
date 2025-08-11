# shipping-cli

Ejemplo de aplicación Node.js (línea de comando) para calcular costo de envío.

## Reglas
- Costo base: L50.00
- Si peso > 5 lb: L20.00 por lb excedente.
- Si distancia > 50 km: L10.00 por km adicional.
- Tiempo estimado de entrega: 2 días de procesamiento + 1 día por cada 100 km (redondeado hacia arriba).

## Cómo usar
1. Abrir terminal en la carpeta del proyecto.
2. Ejecutar `npm install` para instalar dependencias (commander).
3. Ejecutar `npm start` o `node index.js`.
4. Puedes sobrescribir los valores por defecto con flags:
   - `--weight` o `-w` : peso en lb
   - `--distance` o `-d` : distancia en km

Ejemplo:
```
node index.js --weight 10 --distance 70
```

## Git / GitHub
Asegúrate de que `node_modules/` esté en `.gitignore` antes de commitear. Ejemplo rápido:
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <TU_REPO_URL>
git push -u origin main
```

