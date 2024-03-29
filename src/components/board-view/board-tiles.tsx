import React, { memo } from "react";
import { View } from "react-native";
import { Tile } from "./tile";
import { FormatedTile } from "./state/board-view-state";
import { styles } from "./tile.style";

interface BoardTilesProps {
  tiles: FormatedTile[][];
  playable: boolean;
  onPieceMove?: (from: string, to: string) => void;
}

/**
 *
 */
export const BoardTiles = memo((props: BoardTilesProps) => {
  const { tiles, playable, onPieceMove } = props;

  /**
   * Returns an Array of <div class="row"> Elements
   * that contain a row of Tiles
   */
  const boardRowsHtml = tiles.map((tileRows, i) => {
    const rowHtml = tileRows.map((tileRow) => {
      const {
        playerTurn,
        key,
        colour,
        piece,
        isPossibleMove,
        isMovingPiece,
        isHill,
        edgeScore,
        distanceFromPiece,
        isPreviousMove,
      } = tileRow;

      return (
        <Tile
          playerTurn={playerTurn}
          key={key}
          colour={colour}
          tileKey={key}
          isHill={isHill}
          isPossibleMove={isPossibleMove}
          edgeScore={edgeScore}
          isMovingPiece={isMovingPiece}
          piece={piece}
          distanceFromPiece={distanceFromPiece}
          isPrevMove={isPreviousMove}
          playable={playable}
          onPieceMove={onPieceMove}
        />
      );
    });

    return (
      <View key={i} style={styles.boardTiles}>
        {rowHtml}
      </View>
    );
  });

  return <>{boardRowsHtml}</>;
});
