import {useQuery} from "@tanstack/react-query";
import {ISessionState} from "../types/types.ts";
import API from "../classes/api.ts";

export default function useSession() {
    return useQuery<ISessionState>({
        queryKey:["session"],
        queryFn: async () => {
            return await API.session.get();
        }
    });
}