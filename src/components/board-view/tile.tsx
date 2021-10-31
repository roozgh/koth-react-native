import React, { useContext, memo } from "react";
import { View, TouchableHighlight, Pressable, ViewStyle } from "react-native";
import { BoardViewContext } from "./state/board-view-context";
import { Piece } from "../piece/piece";
import { Colour, PieceName } from "../../board-logic/piece";
import { colours } from "../../global.style";
import { styles } from "./tile.style";

interface TileProps {
  playerTurn: Colour;
  tileKey: string;
  colour: string;
  isHill: boolean;
  isPossibleMove: boolean;
  isMovingPiece: boolean;
  isPrevMove: boolean;
  edgeScore?: any;
  distanceFromPiece?: number | null;
  piece: { name: PieceName; colour: Colour } | null;
  playable: boolean;
  onPieceMove?: (from: string, to: string) => void;
}

export const Tile = memo((props: TileProps) => {
  //console.log("TILE RENDER");
  const {
    playerTurn,
    isHill,
    colour,
    isPossibleMove,
    piece,
    tileKey,
    isPrevMove,
    playable,
    onPieceMove,
  } = props;

  const { state, dispatch } = useContext(BoardViewContext);
  const { board, selectedTile, possibleMoves, tileWidth, boardWidth } = state;
  if (!board) throw Error("Board not defined");

  const status = board.state.status;

  /**
   *
   */
  function onClick(e: any) {
    if (status !== "ACTIVE") return;
    if (!playable) return;
    if (selectedTile) {
      if (!possibleMoves) throw Error("possibleMove Array not set");
      // Check if move is legal
      let moveIsLegal = possibleMoves.includes(tileKey);
      // If move not legal, clear board
      if (!moveIsLegal) {
        dispatch({ type: "NO_TILE_SELECTED" });
      }
      // Else make move
      else {
        if (onPieceMove) onPieceMove(selectedTile, tileKey);
      }
    } else {
      dispatch({ type: "TILE_SELECT", tile: tileKey });
    }
  }

  /**
   * STYLE & CLASSES
   */
  let disabled = true;

  let style: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f2f0eb",
    width: tileWidth,
    height: tileWidth,
  };

  if (colour === "DARK") style.backgroundColor = "#e3dfd3";
  if (isHill) style.backgroundColor = "#f5ea62";

  if (state.selectedTile) {
    disabled = false;
    if (state.selectedTile === tileKey) {
      if (playerTurn === "WHITE") style.backgroundColor = "#82e2f5";
      else style.backgroundColor = "#f5c782";
    }
  }

  /**
   * PIECE PROPS
   */
  let pieceElement = null;
  if (piece) {
    disabled = false;

    // Piece size always 85% of Tile size
    let pieceWidth = Math.floor((tileWidth * 80) / 100);
    // If piece is selected, increase its size
    if (selectedTile === tileKey) {
      pieceWidth += 5;
    }

    let movable = false;
    if (status === "ACTIVE" && playable) {
      // Can only move WHITE pieces & can only do it on WHITE's turn
      if (playerTurn === "WHITE" && piece.colour === "WHITE") {
        movable = true;
      }
    }

    let isGolden = false;
    if (status !== "ACTIVE" && isHill && piece.name === "KING") {
      isGolden = true;
    }

    pieceElement = (
      <Piece
        name={piece.name}
        colour={piece.colour}
        movable={movable}
        width={pieceWidth}
        isGolden={isGolden}
      />
    );
  }

  return (
    <Pressable onPress={onClick} style={style} disabled={disabled}>
      <View style={styles.tileInner}>
        {pieceElement}
        {isPossibleMove && <TileHighlight playerTurn={playerTurn} />}
      </View>
    </Pressable>
  );
});

function TileHighlight({ playerTurn }: { playerTurn: Colour }) {
  const margin = 2;
  const borderColor = playerTurn === "BLACK" ? colours.black : colours.white;
  return (
    <>
      <View
        style={[
          styles.highlight,
          { borderColor, top: margin, right: margin, borderLeftWidth: 0, borderBottomWidth: 0 },
        ]}
      />

      <View
        style={[
          styles.highlight,
          { borderColor, bottom: margin, right: margin, borderLeftWidth: 0, borderTopWidth: 0 },
        ]}
      />

      <View
        style={[
          styles.highlight,
          { borderColor, bottom: margin, left: margin, borderRightWidth: 0, borderTopWidth: 0 },
        ]}
      />

      <View
        style={[
          styles.highlight,
          { borderColor, top: margin, left: margin, borderRightWidth: 0, borderBottomWidth: 0 },
        ]}
      />
    </>
  );
}
