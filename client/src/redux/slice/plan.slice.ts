import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlan, IPlans } from "../../interface";

interface IPlanInitialState {
   searchKey: string;
   plans: IPlan[];
   limit: number;
   total: number;
   count: number;
   activePlan: IPlan;

}

const initialState: IPlanInitialState = {
   plans: [],
   searchKey: "",
   limit: 30,
   total: 30,
   count: 0,
   activePlan: {} as IPlan
};

const planSlice = createSlice( {
   name: "plan",
   initialState: initialState,
   reducers: {

      deletePlan: ( state, { payload }: PayloadAction<string> ) => {
         state.plans = state.plans.filter( plan => plan.id !== payload );
      },

      addPlan: ( state, { payload }: PayloadAction<IPlan> ) => {
         state.plans.push( payload );
         state.plans = state.plans.sort( ( a, b ) => b.lastModified - a.lastModified );
      },

      setPlans: ( state, { payload }: PayloadAction<IPlans> ) => {
         state.plans = payload.data;
         state.count = payload.count;
      },

      setSearchKey: ( state, { payload }: PayloadAction<string> ) => {
         state.searchKey = payload;
      },

      updateTitle: ( state, { payload }: PayloadAction<{ planId: string, title: string }> ) => {
         state.activePlan.title = payload.title;
         state.plans = state.plans.map( item => {
            if ( item.id === payload.planId ) {
               item.title = payload.title;
            }
            return item;
         } );
      },

      setActivePlan: ( state, { payload }: PayloadAction<IPlan> ) => {
         state.activePlan = payload;
      },

      next: ( state ) => {
         if ( state.total <= state.count ) {
            state.total = state.total + state.limit;
         }
      },

   },

} );

export const planReducer = planSlice.reducer;
export const planAction = planSlice.actions;
