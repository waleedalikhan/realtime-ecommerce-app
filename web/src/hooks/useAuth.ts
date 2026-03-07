import { useSelector } from "react-redux";
import { RootState } from "@/store";

const useAuth = () => {
    const auth = useSelector((s: RootState) => s.auth);

    return { ...auth, isLoggedIn: !!auth.token || !!auth.refreshToken };
}


export default useAuth;