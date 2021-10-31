import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },

  status: {
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    flex: 0.2,
    marginBottom: 10,
  },

  capturedPieces: {
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 0.3,
    padding: 10,
  },
});
