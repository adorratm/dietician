import {
  extend,
  localize
} from "vee-validate";
import * as rules from 'vee-validate/dist/rules';
import tr from 'vee-validate/dist/locale/tr.json';
Object.keys( rules ).forEach( rule => {
  extend( rule, {
    ...rules[ rule ], // copies rule configuration
  } );
} );

// with typescript
for ( let [ rule, validation ] of Object.entries( rules ) ) {
  extend( rule, {
    ...validation
  } );
}

localize( 'tr', tr );
