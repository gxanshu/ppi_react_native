import { Icon, Input, Layout, Text, Button } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface Props {
	pageHandler: () => void;
}

export default function LoginPage({ pageHandler }: Props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const toggleSecureEntry = (): void => {
		setSecureTextEntry(!secureTextEntry);
	};

	const renderIcon = (props: any): React.ReactElement => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon
				{...props}
				name={secureTextEntry ? 'eye-off' : 'eye'}
			/>
		</TouchableWithoutFeedback>
	);

	return (
		<Layout style={styles.container}>
			<Icon
				style={styles.icon}
				fill='#8F9BB3'
				name='person'
			/>
			<Text category="h5" style={styles.heading}>Welcome!</Text>
			<Input
				placeholder='Your Email'
				keyboardType="email-address"
				style={styles.input}
				value={email}
				onChangeText={nextValue => setEmail(nextValue)}
				accessoryRight={<Icon name="email" />}
			/>
			<Input
				placeholder='Your Password'
				keyboardType="visible-password"
				style={styles.input}
				value={password}
				onChangeText={nextValue => setPassword(nextValue)}
				accessoryRight={renderIcon}
				secureTextEntry={secureTextEntry}
			/>
			<Button style={styles.button}>
				Login
			</Button>
			<Layout style={styles.register}>
				<TouchableOpacity onPress={pageHandler}>
					<Text>Register Now</Text>
				</TouchableOpacity>
			</Layout>
		</Layout>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: 'Inter',
		marginLeft: 20,
		marginRight: 20
	},
	icon: {
		width: 42,
		height: 42,
	},
	heading: {
		fontFamily: "InterBold",
		marginBottom: 10
	},
	input: {
		marginTop: 6,
		marginBottom: 6
	},
	button: {
		marginTop: 10,
		marginBottom: 10,
		width: '100%'
	},
	register: {
		width: '100%',
		alignItems: "flex-end",
	}
});