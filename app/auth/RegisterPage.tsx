import {
	Icon,
	Input,
	Layout,
	Text,
	Button,
	SelectItem,
	Select,
	IndexPath,
} from "@ui-kitten/components";
import { useState } from "react";
import {
	ScrollView,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { districts } from "@/utils/districts";
import Loader from "@/components/Loader";
import Toast from "react-native-root-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, realtimeDB, storage } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import {
	increment,
	ref as realtimeRef,
	update,
} from "firebase/database";
import { getFileExtension } from "@/utils/tools";
import { useAuth } from "@/context/AuthContext";

interface Props {
	pageHandler: () => void;
}

export default function RegisterPage({ pageHandler }: Props) {
	const [firstName, setFirstName] = useState<string>();
	const [lastName, setLastName] = useState<string>();
	const [fatherName, setFatherName] = useState<string>();
	const [phoneNumber, setPhoneNumber] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [address, setAddress] = useState<string>();
	const [district, setDistrict] = useState<IndexPath>(new IndexPath(0));
	const [userType, setUserType] = useState<IndexPath>(new IndexPath(0));
	const [aadharFront, setAadharFront] =
		useState<ImagePicker.ImagePickerAsset | null>(null);
	const [aadharBack, setAadharBack] =
		useState<ImagePicker.ImagePickerAsset | null>(null);
	const [password, setPassword] = useState<string>();
	const [loading, setLoading] = useState(false);
	const {signIn} = useAuth()

	const possibleUserTypes = ["Member - 20", "Driver - 50", "Associate - 100"];

	const pickImage = async (select: "front" | "back") => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			if (select == "front") setAadharFront(result.assets[0]);
			if (select == "back") setAadharBack(result.assets[0]);
		}
	};

	const handleRegister = async () => {
		// checking if all inputs boxes are filed or not
		if (
			!firstName ||
			!lastName ||
			!fatherName ||
			!phoneNumber ||
			!email ||
			!address ||
			!district ||
			!userType ||
			!aadharFront ||
			!aadharBack ||
			!password
		) {
			Toast.show("Fill complete form!", {
				duration: Toast.durations.SHORT,
			});
			return;
		}

		// checking if user entered right email or not
		const validEmail = /^\S+@\S+$/.test(email!);
		if (!validEmail) {
			Toast.show("Email is invalid!", {
				duration: Toast.durations.SHORT,
			});
			return;
		}

		// validating mobile number must be 10 digits
		const validNumber = /^[6789]\d{9}$/.test(String(phoneNumber));
		if (!validNumber) {
			Toast.show("Mobile number is invalid!", {
				duration: Toast.durations.SHORT,
			});
			return;
		}

		try {
			// checking if phone number already used or not!
			const docRef = doc(db, "users", phoneNumber);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				Toast.show("Phone number already registered", {
					duration: Toast.durations.LONG,
				});
				return;
			}

			setLoading(true);

			// creating user
			const user = await createUserWithEmailAndPassword(auth, email, password);

			// uploading image
			let documentRef = ref(
				storage,
				`documents/${phoneNumber}/aadharFront.${getFileExtension(aadharFront.uri)}`,
			);

			const aadharFrontblob: Blob = await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.onload = function () {
					resolve(xhr.response);
				};
				xhr.onerror = function (e) {
					console.log(e);
					reject(new TypeError("Network request failed"));
				};
				xhr.responseType = "blob";
				xhr.open("GET", aadharFront.uri, true);
				xhr.send(null);
			});

			await uploadBytes(documentRef, aadharFrontblob, {
				contentType: `image/${getFileExtension(aadharFront.uri)}`,
			});

			documentRef = ref(
				storage,
				`documents/${phoneNumber}/aadharBack.${getFileExtension(aadharBack.uri)}`,
			);

			const aadharBackblob: Blob = await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.onload = function () {
					resolve(xhr.response);
				};
				xhr.onerror = function (e) {
					console.log(e);
					reject(new TypeError("Network request failed"));
				};
				xhr.responseType = "blob";
				xhr.open("GET", aadharBack.uri, true);
				xhr.send(null);
			});

			await uploadBytes(documentRef, aadharBackblob, {
				contentType: `image/${getFileExtension(aadharBack.uri)}`,
			});

			// saving user's data
			const data = {
				Name: `${firstName} ${lastName}`,
				FatherName: fatherName,
				PhoneNumber: phoneNumber,
				Address: address,
				District: districts[district.row],
				EmailAddress: email,
				Type: possibleUserTypes[userType.row],
				AadharFrontFile: `documents/${phoneNumber}/aadharFront.${getFileExtension(aadharFront.uri)}`,
				AadharBackFile: `documents/${phoneNumber}/aadharBack.${getFileExtension(aadharBack.uri)}`,
				CreatedAt: new Date().toISOString(),
			};

			setDoc(doc(db, "users", `${phoneNumber}`), data);

			// increment district total user
			const dbRef = realtimeRef(realtimeDB);
			const updates: any = {};
			updates[`rajasthan/${districts[district.row]}`] = increment(1);
			update(dbRef, updates);

			Toast.show("Registered Successfully!", {
				duration: Toast.durations.SHORT,
			});

			signIn(user.user);

			setLoading(false);
		} catch (e: any) {
			Toast.show(e.message, {
				duration: Toast.durations.LONG,
			});
			setLoading(false);
		}
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<ScrollView>
			<Layout style={styles.container}>
				<Icon style={styles.icon} fill="#8F9BB3" name="person-add" />
				<Text category="h5" style={styles.heading}>
					Create an account!
				</Text>
				<Layout style={{ flexDirection: "row", width: "100%", gap: 10 }}>
					<Input
						placeholder="First Name"
						style={{ ...styles.input, width: "48.5%" }}
						value={firstName}
						onChangeText={(nextValue) => setFirstName(nextValue)}
					/>
					<Input
						placeholder="Last Name"
						style={{ ...styles.input, width: "48.5%" }}
						value={lastName}
						onChangeText={(nextValue) => setLastName(nextValue)}
					/>
				</Layout>
				<Input
					placeholder="Father Name"
					style={styles.input}
					value={fatherName}
					onChangeText={(nextValue) => setFatherName(nextValue)}
				/>
				<Input
					placeholder="Phone Number"
					keyboardType="phone-pad"
					style={styles.input}
					value={phoneNumber}
					onChangeText={(nextValue) => setPhoneNumber(nextValue)}
				/>
				<Input
					placeholder="Your Email"
					keyboardType="email-address"
					style={styles.input}
					value={email}
					onChangeText={(nextValue) => setEmail(nextValue)}
				/>
				<Input
					placeholder="Address"
					style={styles.input}
					value={address}
					onChangeText={(nextValue) => setAddress(nextValue)}
				/>
				<Select
					placeholder="District"
					selectedIndex={district}
					value={districts[district.row]}
					style={{ ...styles.input, width: "100%" }}
					onSelect={(index) => setDistrict(index as IndexPath)}
				>
					{districts.map((district, index) => (
						<SelectItem key={index} title={district} />
					))}
				</Select>
				<Select
					selectedIndex={userType}
					placeholder="User Type"
					value={possibleUserTypes[userType.row]}
					style={{ ...styles.input, width: "100%" }}
					onSelect={(index) => setUserType(index as IndexPath)}
				>
					{possibleUserTypes.map((type, index) => (
						<SelectItem key={index} title={type} />
					))}
				</Select>
				<Layout
					style={{
						...styles.input,
						flexDirection: "row",
						width: "100%",
						gap: 10,
					}}
				>
					<TouchableOpacity
						style={styles.aadhar}
						onPress={() => {
							pickImage("front");
						}}
					>
						{aadharFront ? (
							<Image
								source={{ uri: aadharFront.uri }}
								style={{ width: "100%", height: "100%" }}
							/>
						) : (
							<>
								<Icon
									name="camera"
									style={{ height: 24, width: 24 }}
									fill="gray"
								/>
								<Text>Aadhar Front</Text>
							</>
						)}
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.aadhar}
						onPress={() => {
							pickImage("back");
						}}
					>
						{aadharBack ? (
							<Image
								source={{ uri: aadharBack.uri }}
								style={{ width: "100%", height: "100%" }}
							/>
						) : (
							<>
								<Icon
									name="camera"
									style={{ height: 24, width: 24 }}
									fill="gray"
								/>
								<Text>Aadhar Back</Text>
							</>
						)}
					</TouchableOpacity>
				</Layout>
				<Input
					placeholder="Your Password"
					keyboardType="visible-password"
					style={styles.input}
					value={password}
					onChangeText={(nextValue) => setPassword(nextValue)}
				/>
				<Button style={styles.button} onPress={handleRegister}>
					Register
				</Button>
				<Layout style={styles.register}>
					<TouchableOpacity onPress={pageHandler}>
						<Text>Login Now</Text>
					</TouchableOpacity>
				</Layout>
			</Layout>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		fontFamily: "Inter",
		marginLeft: 20,
		marginRight: 20,
		paddingTop: StatusBar.currentHeight! + 40,
		paddingBottom: StatusBar.currentHeight! + 20,
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
	aadhar: {
		height: 100,
		backgroundColor: "#EDF1F7",
		width: "48.5%",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
});
