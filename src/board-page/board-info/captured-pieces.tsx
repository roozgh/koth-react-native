import React from "react";
import { View } from "react-native";
import { Board } from "../../board-logic/board/board";
import { Piece } from "../../components/piece/piece";
import { styles } from "./style";

interface CapturedPiecesProp {
  board: Board;
  colour: "WHITE" | "BLACK";
  pieceWidth: number;
}

/**
 *
 */
export function CapturedPieces(props: CapturedPiecesProp) {
  const { board, colour, pieceWidth } = props;
  const capturedPieces = board.state.getCapturedPieces();
  const pieces = capturedPieces
    .filter((piece) => colour === piece.colour)
    .map((piece) => <Piece name={piece.name} colour={colour} key={piece.id} width={pieceWidth} />);

  return <View style={styles.capturedPieces}>{pieces}</View>;
}
