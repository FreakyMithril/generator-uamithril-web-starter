import { generateRandom, sum } from 'modules/utility';

import $ from 'jquery';

$('.cta').on('click',function() {
  alert('Ya clicked it!');
});

//========================================================================
//Begin all initial scripts
//========================================================================
(($, window, document) => {
	'use strict';

	//start code here
  console.log(header);

  let name = "Guy Fieri";
  let place = "Flavortown";

  console.log(`Hello ${name}, ready for ${place}?`);


})(jQuery, window, document);
//========================================================================
//end all initial scripts
//========================================================================