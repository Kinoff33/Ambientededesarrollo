#!/usr/bin/env node
const { program } = require('commander');
const pkg = require('./package.json');

program
  .name('shipping-cli')
  .description('Calculadora de costo de envío')
  .version(pkg.version)
  .option('-w, --weight <number>', 'Peso del paquete en lb', parseFloat)
  .option('-d, --distance <number>', 'Distancia en km', parseFloat);

program.parse(process.argv);
const options = program.opts();

// Parámetros por defecto (parte del código)
const DEFAULTS = {
  weight: 3,    // lb  <- Cambia aquí si quieres otros valores por defecto
  distance: 40  // km <- Cambia aquí si quieres otros valores por defecto
};

const weight = (typeof options.weight === 'number') ? options.weight : DEFAULTS.weight;
const distance = (typeof options.distance === 'number') ? options.distance : DEFAULTS.distance;

const BASE_COST = 50.00;
const WEIGHT_THRESHOLD = 5; // lb
const WEIGHT_RATE = 20.00; // por lb excedente
const DISTANCE_THRESHOLD = 50; // km
const DISTANCE_RATE = 10.00; // por km adicional

const extraWeight = Math.max(0, weight - WEIGHT_THRESHOLD);
const weightCharge = extraWeight * WEIGHT_RATE;

const extraDistance = Math.max(0, distance - DISTANCE_THRESHOLD);
const distanceCharge = extraDistance * DISTANCE_RATE;

const total = BASE_COST + weightCharge + distanceCharge;

function formatL(value) {
  return `L${value.toFixed(2)}`;
}

function addDays(date, days) {
  const res = new Date(date);
  res.setDate(res.getDate() + days);
  return res;
}

// Tiempo estimado: 2 días procesamiento + 1 día por cada 100 km (redondeado hacia arriba)
const processingDays = 2;
const transportDays = Math.ceil(distance / 100);
const totalDays = processingDays + transportDays;

const today = new Date();
const estDate = addDays(today, totalDays);
const yyyy = estDate.getFullYear();
const mm = String(estDate.getMonth() + 1).padStart(2, '0');
const dd = String(estDate.getDate()).padStart(2, '0');
const estDateStr = `${yyyy}-${mm}-${dd}`;

console.log(`Peso (lb): ${weight}`);
console.log(`Distancia (km): ${distance}`);
console.log('');
console.log(`Costo base: ${formatL(BASE_COST)}`);
console.log(`Recargo por peso: ${formatL(weightCharge)}`);
console.log(`Recargo por distancia: ${formatL(distanceCharge)}`);
console.log(`Costo total: ${formatL(total)}`);
console.log(`Fecha estimada de entrega: ${estDateStr}`);
console.log('');
console.log('Nota: Valores por defecto están en el código. Puedes sobrescribir con --weight y --distance.');
