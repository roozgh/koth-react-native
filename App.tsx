import React from "react";
import { StatusBar } from "expo-status-bar";
import Page from "./src/board-page/board-page";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Page />
    </>
  );
}
