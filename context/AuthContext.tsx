import { auth } from "@/utils/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// Define types
type AuthContextType = {
	user: User | null;
	loading: boolean;
	signIn: (user: User) => void;
	signOut: () => void;
};

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create AuthProvider component
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		// Cleanup function
		return () => unsubscribe();
	}, []);

	const authContextValue: AuthContextType = {
		user,
		loading,
		signIn: async (user) => {
			// Implement your sign-in logic here
			setUser(user);
		},
		signOut: async () => {
			setLoading(true);
			await signOut(auth);
			setUser(null);
			setLoading(false);
		},
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
