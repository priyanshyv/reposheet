//we generally use context to provide some global value to our entire application
//so that we dont do prop drilling 
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkUserLoggedIn = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/auth/check", { credentials: "include" });
				const data = await res.json();
				setAuthUser(data.user); // null or authenticated user object
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		checkUserLoggedIn();
	}, []);
    //what ever we pass into the value that will be available for our entire application
	return <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>{children}</AuthContext.Provider>;
};