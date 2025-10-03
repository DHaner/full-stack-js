import { useContext } from "react";
import PatientsContext from "../context/PatientsProvider";

export function usePatients() {
    return useContext(PatientsContext);
}