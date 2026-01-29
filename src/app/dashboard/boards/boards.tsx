"use client";

import { CreateBoard } from "@/components/board/create-board";
import {
  BoardItem,
  BoardContainer,
  BoardWorkspace,
} from "@/components/board/board";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { boardsSelectors } from "@/store/board/board.selectors";
import { Board } from "@/types/board.type";
import { Clock, Rocket, StarIcon } from "lucide-react";
import { useEffect } from "react";
import { BoardFacade } from "@/facades/board.facade";
import { SkeletonBoardsPage } from "@/components/ui/skeleton";

const Boards = () => {
  const boards = useAppSelector((state: RootState) =>
    boardsSelectors.selectAll(state)
  );
  const { user } = useAppSelector((state: RootState) => state.user);
  const { loading } = useAppSelector((state: RootState) => state.board);
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (boards.length > 0) return
    BoardFacade.loadAll();
  }, [accessToken, boards]);

  if (loading || !boards) return <SkeletonBoardsPage />;

  return (
    <div className="flex-1 min-h-screen pt-4 px-30 max-lg:px-10">
      {/* Starred */}
      {boards.filter((b) => b.starred).length > 0 && (
        <BoardContainer icon={<StarIcon />} title="Starred boards">
          {boards.map((b: Board) => {
            if (b.starred)
              return <BoardItem board={b} key={b._id} type="primary" />;
          })}
        </BoardContainer>
      )}
      {/* Viewed */}
      {user.recentBoards?.length > 0 && (
        <BoardContainer icon={<Clock />} title="Recently viewed">
          {boards
            .filter((b) =>
              new Set(user.recentBoards.map((b) => b.board._id)).has(b._id)
            )
            .map((b: Board) => (
              <BoardItem board={b} key={b._id} type="primary" />
            ))}
        </BoardContainer>
      )}
      {/* Your Workspace */}
      <BoardWorkspace label="your workspace">
        <BoardContainer icon={<Rocket />} title="Trello Workspace">
          {boards.map((b: any) => {
            return <BoardItem board={b} key={b._id} type="primary" />;
          })}
          <Popover
            trigger={
              <Button
                className="justify-center rounded-md dark:bg-card"
                title="Create new board"
              />
            }
            side="right"
            sideOffset={-300}
          >
            <div className="dark:bg-background">
              <CreateBoard />
            </div>
          </Popover>
        </BoardContainer>
      </BoardWorkspace>
    </div>
  );
};

export default Boards;
