import { generateRandom, sum } from './modules/utility';
import { header} from './modules/header';
import { footer } from './modules/footer';
import { $, jQuery } from "jquery";
import bootstrap from "bootstrap";

console.log($);

console.log(sum(8, 19));
console.log(generateRandom());
console.log(header);
console.log(footer);

let name = "Guy Fieri";
let place = "Flavortown";
console.log(`Hello ${name}, ready for ${place}?`);