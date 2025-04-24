import { create as actualCreate, StoreApi } from "zustand";
import {
  createJSONStorage as actualCreateJSONStorage,
  persist as actualPersist,
} from "zustand/middleware";

const storeResetFns = new Set<() => void>();

export const create = actualCreate;

export const persist = actualPersist;

export const createJSONStorage = actualCreateJSONStorage;

export const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => {
    try {
      resetFn();
    } catch (error) {
      console.error("Error resetting store:", error);
    }
  });
};

export const registerStore = <T extends object>(
  zustandStore: StoreApi<T>
): void => {
  if (
    typeof zustandStore?.setState !== "function" ||
    typeof zustandStore?.getState !== "function"
  ) {
    console.error("Invalid store provided to registerStore");
    return;
  }

  // Create reset function that preserves methods
  const resetFn = () => {
    try {
      const currentState = zustandStore.getState();

      // Reset using a function to avoid type issues
      zustandStore.setState((state: T) => {
        // First create the reset state (non-function values)
        const resetState = Object.fromEntries(
          Object.entries(currentState)
            .filter(([, value]) => typeof value !== "function")
            .map(([key]) => [key, null]) // Set all state values to null
        );

        // Then keep all methods from current state
        const methods = Object.fromEntries(
          Object.entries(state).filter(
            ([, value]) => typeof value === "function"
          )
        );

        // Combine and return
        return {
          ...resetState,
          ...methods,
        } as T; // Cast to the expected type
      }, true);
    } catch (error) {
      console.error("Error in resetFn:", error);
    }
  };

  storeResetFns.add(resetFn);
};

// EXPERIMENTAL - User-namespaced persist middleware hybrid approach
// This is a proof-of-concept for user-namespaced storage
// It's not recommended for production use, but could be useful
// for certain scenarios where you need to separate user data
// REASON: Auth tokens returned from the service are expiring ones
// which leads to duplication of data in the localStorage

// // Get a unique namespace from auth token
// const getUserNamespace = (): string => {
//   try {
//     // Get authToken directly from localStorage instead of from the store
//     // let authToken = null;
//     let email = null;

//     const authDataStr = localStorage.getItem(StorageEnum.auth);
//     if (authDataStr) {
//       try {
//         const authData = JSON.parse(authDataStr);
//          authToken = authData.state?.authToken;
//         email = authData.state?.email;

//       } catch (e) {
//         console.error("Error parsing auth data:", e);
//       }
//     }

//     // Create a shortened hash from the auth token for storage key
// //     if (email) {
// //       return `user-${email}`;
// //     }
//       if (authToken) {
//         const tokenPrefix = authToken.slice(0, 4);
//         const tokenSuffix = authToken.slice(-4);
//         return `user_${tokenPrefix}${tokenSuffix}`;
//       }
//     return "guest";
//   } catch (error) {
//     console.error("Error getting user namespace:", error);
//     return "guest";
//   }
// };

// // But you can use this to clear all persisted data
// export const clearCurrentUserPersistedData = (): void => {
//   const namespace = getUserNamespace();

//   // Only proceed if we have a valid user namespace (not 'guest')
//   if (namespace !== "guest") {
//     const itemsToRemove: string[] = [];

//     // First, collect all keys that need to be removed
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       if (key && key.startsWith(`${namespace}-`)) {
//         itemsToRemove.push(key);
//       }
//     }

//     // Then remove them (we do this separately to avoid issues with
//     // the localStorage.length changing during iteration)
//     itemsToRemove.forEach((key) => {
//       localStorage.removeItem(key);
//     });

//     console.log(
//       `Cleared ${itemsToRemove.length} persisted items for user namespace: ${namespace}`
//     );
//   }
// };

// // Custom persist middleware that uses user namespaces
// export const persist = <T>(
//   stateCreator: StateCreator<T, [], []>,
//   options: PersistOptions<T, unknown>
// ): StateCreator<T, [], [["zustand/persist", unknown]]> => {
//   // Special case for auth store - don't namespace it
//   if (options.name === "auth-data") {
//     return actualPersist(stateCreator, options);
//   }

//   // For all other stores, create user-namespaced versions
//   return (set, get, api) => {
//     const namespace = getUserNamespace();
//     const namespacedOptions: PersistOptions<T, unknown> = {
//       ...options,
//       name: options.name ? `${namespace}_${options.name}` : namespace,
//     };

//     return actualPersist(stateCreator, namespacedOptions)(set, get, api);
//   };
// };
