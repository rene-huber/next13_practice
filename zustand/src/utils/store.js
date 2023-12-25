import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'



const getDefaultInitialState = () => ({
  lastUpdate: Date.now(),
  light: false,
  count: 0,
})



const zustandContext = createContext(null)

export const Provider = zustandContext.Provider

export const useStore = (state) => {
  const store = useContext(zustandContext)

  if (!store) throw new Error('Store is missing the provider')

  return useZustandStore(store, selector)
}

export const initializeStore = (preloadedState = {}) => {
    // Ensure getDefaultInitialState is defined and returns the default state
    const getDefaultInitialState = () => {
      // Define the default state structure
      return {
        count: 0,
        lastUpdate: null,
        light: false,
      };
    };
  
    // Ensure createStore is defined or imported from your state management library
    return createStore((set, get) => ({
      ...getDefaultInitialState(),
      ...preloadedState,
      tick: (lastUpdate, light) => {
        set({
          lastUpdate,
          light: !!light,
        });
      },
      increment: () => {
        set({
          count: get().count + 1,
        });
      },
      decrement: () => {
        set({
          count: get().count - 1,
        });
      },
      reset: () => {
        set({
          count: getDefaultInitialState().count,
        });
      },
    }));
  };
  