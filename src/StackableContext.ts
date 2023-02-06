import { createContext } from "react";

export default createContext<
  | {
      /**
       * Represents the last Z used by any component that manipulates this context
       */
      lastZ: number;
      /**
       * The setter returned by useState. Used to trigger rerenders
       */
      setLastZ: React.Dispatch<React.SetStateAction<number>>;
    }
  | undefined
>(undefined);
