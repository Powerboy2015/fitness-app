import {useMutation, useQueryClient} from "@tanstack/react-query";
import API from "../classes/api.ts";

export default function useUpdateSet() {
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn: API.session.updateSet,
        onSuccess: () => {
            queryclient.invalidateQueries({queryKey:["session"]})
        }
    })
}