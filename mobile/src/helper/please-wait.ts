export const pleaseWait = (ms: number) => {
   return new Promise((resolve: any, reject) => {
      setTimeout(resolve, ms);
   });
};
