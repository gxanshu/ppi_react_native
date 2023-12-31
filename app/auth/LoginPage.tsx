import { useAuth } from "@/context/AuthContext";
import { auth } from "@/utils/firebase";
import { Icon, Input, Layout, Text, Button } from "@ui-kitten/components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Toast from "react-native-root-toast";

interface Props {
	pageHandler: () => void;
}

export default function LoginPage({ pageHandler }: Props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {signIn} = useAuth();

	const handleLogin = async () => {
		if (!email.length || !password.length) {
			Toast.show("Enter your details!", {
				duration: Toast.durations.SHORT,
			});
			return;
		}

		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
			signIn(user.user);
			
		} catch (e: any) {
			Toast.show(e.message, {
				duration: Toast.durations.SHORT,
			});
		}
	};

	return (
		<Layout style={styles.container}>
			<Icon style={styles.icon} fill="#8F9BB3" name="person" />
			<Text category="h5" style={styles.heading}>
				Welcome!
			</Text>
			<Input
				placeholder="Your Email"
				keyboardType="email-address"
				style={styles.input}
				value={email}
				onChangeText={(nextValue) => setEmail(nextValue)}
				accessoryRight={<Icon name="email" />}
			/>
			<Input
				placeholder="Your Password"
				keyboardType="visible-password"
				style={styles.input}
				value={password}
				onChangeText={(nextValue) => setPassword(nextValue)}
			/>
			<Button style={styles.button} onPress={handleLogin}>
				Login
			</Button>
			<Layout style={styles.register}>
				<TouchableOpacity onPress={pageHandler}>
					<Text>Register Now</Text>
				</TouchableOpacity>
			</Layout>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		fontFamily: "Inter",
		paddingLeft: 20,
		paddingRight: 20,
	},
	icon: {
		width: 42,
		height: 42,
	},
	heading: {
		fontFamily: "InterBold",
		marginBottom: 10,
	},
	input: {
		marginTop: 6,
		marginBottom: 6,
	},
	button: {
		marginTop: 10,
		marginBottom: 10,
		width: "100%",
	},
	register: {
		width: "100%",
		alignItems: "flex-end",
	},
});
