import { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
    entries: Entry[] /*TODO viene desde la interface */
}


export const EntriesContext = createContext({} as ContextProps)