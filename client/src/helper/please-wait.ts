export const pleaseWait = ( ms: number ) => {
   return new Promise( ( resolve: any ) => {
      setTimeout( resolve, ms );
   } );
};
