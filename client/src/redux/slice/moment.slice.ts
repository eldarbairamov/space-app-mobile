import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMoment, IMoments } from "../../interface";

interface IMomentInitialState {
   moments: IMoment[];
   activeMoment: IMoment;
   searchKey: string;
   tags: (string | undefined)[];
   count: number;
   limit: number;
   total: number;
}

const initialState: IMomentInitialState = {
   moments: [],
   activeMoment: {} as IMoment,
   searchKey: "",
   tags: [],
   count: 0,
   limit: 10,
   total: 10,
};

const momentSlice = createSlice( {
   name: "moment",
   initialState,
   reducers: {

      setMoments: ( state, { payload }: PayloadAction<IMoments> ) => {
         state.activeMoment = {} as IMoment;
         state.moments = payload.data;
         state.tags = payload.tagsForFilter;
         state.count = payload.count;
      },

      addMoment: ( state, { payload }: PayloadAction<IMoment> ) => {
         state.moments.push( payload );
         state.moments = state.moments.sort( ( a, b ) => b.createdAt - a.createdAt );
         state.tags.push( payload.tag );
         state.tags = Array.from( new Set( state.tags.flat() ) );
      },

      deleteMoment: ( state, { payload }: PayloadAction<{ momentId: string }> ) => {
         state.moments = state.moments.filter( moment => moment.id !== payload.momentId );
         state.tags = state.moments.map( moment => moment.tag );
         state.tags = Array.from( new Set( state.tags ) );
      },

      setActiveMoment: ( state, { payload }: PayloadAction<IMoment> ) => {
         state.activeMoment = payload;
      },

      setSearchKey: ( state, { payload }: PayloadAction<string> ) => {
         state.searchKey = payload;
      },

      setDate: ( state, { payload }: PayloadAction<number> ) => {
         state.activeMoment!.date = payload;
      },

      editTag: ( state, { payload }: PayloadAction<string> ) => {
         state.activeMoment!.tag = payload;
      },

      setPhoto: ( state, { payload }: PayloadAction<{ photo: string }> ) => {
         state.activeMoment.photo = payload.photo;
         state.moments = state.moments.map( item => {
            if ( item.id === state.activeMoment.id ) {
               item.photo = payload.photo;
               return item;
            }
            return item;
         } );
      },

      updateMoment: ( state, { payload }: PayloadAction<IMoment> ) => {
         state.moments = state.moments.map( item => {
            if ( item.id === payload.id ) {
               item = payload;
            }
            return item;
         } );

         state.tags = state.moments.map( moment => moment.tag );
         state.tags = Array.from( new Set( state.tags ) );
      },

      next: ( state ) => {
         if ( state.total <= state.count ) {
            state.total = state.total + state.limit;
         }
      },

   },
} );

export const momentReducer = momentSlice.reducer;
export const momentActions = momentSlice.actions;
