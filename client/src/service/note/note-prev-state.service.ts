import { INote } from "../../interface";
import { useEffect, useState } from "react";

export function notePrevStateService( activeNote: INote ) {
   const [ prevState, setPrevState ] = useState<INote>( {} as INote );

   useEffect( () => {
      setPrevState( activeNote );
   }, [] );

   return { prevState, setPrevState };

}
