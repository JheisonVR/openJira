import { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
    entries: Entry[] /*TODO viene desde la interface */
    addNewEntry: (description: string) => void
    updateEntry: (entrie: Entry, showSnackbar: boolean) => void
}


export const EntriesContext = createContext({} as ContextProps)