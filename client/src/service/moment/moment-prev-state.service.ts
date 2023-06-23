import { IMoment } from "../../interface";
import { useEffect, useState } from "react";

export function momentPrevStateService( activeMoment: IMoment ) {
   const [ prevState, setPrevState ] = useState<IMoment>( {} as IMoment );

   useEffect( () => {
      setPrevState( activeMoment );
   }, [] );

   return { prevState, setPrevState };

}
