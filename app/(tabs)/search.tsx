import { UserType } from "@/app/auth/RegisterPage";
import { db, storage } from "@/utils/firebase";
import { Avatar, Card, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect} from "react";
import { StyleSheet, StatusBar, View, ActivityIndicator } from "react-native";
import Toast from "react-native-root-toast";
import { getDownloadURL, ref } from "firebase/storage";

export default function SearchPage() {
	const [loading, setLoading] = useState(false);
	const [searchResult, setSearchResult] = useState<UserType>();

	const searchByNumber = async (phoneNumber: string) => {
		// checking if mobile number is 10 digit long or not
		if (/^[6789]\d{9}$/.test(phoneNumber) && loading == false) {
			try {
				setLoading(true);
				const docRef = doc(db, "users", phoneNumber);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setSearchResult(docSnap.data() as UserType)
				} else {
					Toast.show("No user found!", {
						duration: Toast.durations.SHORT,
					});
				}

				setLoading(false);
			} catch (e: any) {
				Toast.show(e.message, {
					duration: Toast.durations.SHORT,
				});
				setLoading(false);
			}
		} else {
			setSearchResult(undefined);
		}
	};

	return (
		<Layout style={styles.container}>
			<Input
				placeholder="Search by number"
				maxLength={10}
				keyboardType="number-pad"
				onChangeText={(nextValue) => searchByNumber(nextValue)}
				accessoryRight={<Icon name="search" />}
			/>
			<Layout style={styles.listContainer} level="2">
				{loading && <ActivityIndicator size={'small'} color="#3366FF" />}
				{searchResult && <ListItem details={searchResult} />}
			</Layout>
		</Layout>
	);
}

const ListItem = ({
	details
}: {
	details: UserType
}) => {
	const [image, setImage] = useState<string | undefined>();

	const downloadImage = async() => {
		try {
			const url = await getDownloadURL(ref(storage, details.profilePic));
			setImage(url);
		} catch (e: any) {
			Toast.show(e.message, {
				duration: Toast.durations.SHORT
			})
		}
	}

	useEffect(()=> {
		downloadImage();
	}, [])

	return (
		<Card style={styles.listItem} onPress={()=> {
			router.push({
				pathname: "/user/[id]",
				params: {id: details.PhoneNumber, ...details, Active: String(details.Active)}
			})
		}}>
			<View style={styles.listList}>
				<Avatar
					size="medium"
					style={{ margin: -10 }}
					source={image ? {uri: image} : require("@/assets/images/avatar.png")}
				/>
				<View>
					<Text>{details.Name}</Text>
					<Text>{details.PhoneNumber}</Text>
				</View>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: StatusBar.currentHeight! + 20,
		paddingHorizontal: 10,
		height: "100%",
	},
	listContainer: {
		marginTop: 20,
		flexDirection: "column",
		gap: 8,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	listItem: {
		width: "100%",
	},
	listList: {
		flexDirection: "row",
		gap: 30,
		alignItems: "center",
		justifyContent: "flex-start",
	},
});
