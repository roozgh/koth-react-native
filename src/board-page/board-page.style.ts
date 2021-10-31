import { StyleSheet } from "react-native";
import { colours } from "../global.style";

export const styles = StyleSheet.create({
  page: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    backgroundColor: colours.lightGray,
    paddingTop: 40,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
});
