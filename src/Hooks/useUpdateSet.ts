import {useMutation} from "@tanstack/react-query";
import API from "../classes/api.ts";

export default function useUpdateSet() {
    return useMutation({
        mutationFn: API.session.updateSet
    })
}