"use client";

import { CreateBoard } from "@/components/boards/create-board";
import {
  BoardItem,
  BoardContainer,
  BoardWorkspace,
} from "@/components/ui/board";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AppDispatch, RootState } from "@/store";
import { setBoards } from "@/store/boardSlice";
import { fetchUser } from "@/store/userSlice";
import { Board } from "@/types/board.type";
import { Clock, Rocket, StarIcon } from "lucide-react";
import { useEffect } from "react";

type props = {
  data: Board[];
};

const Boards = ({ data }: props) => {
  const dispatch = useAppDispatch<AppDispatch>();
  const { boards } = useAppSelector((state: RootState) => state.board);
  const { user } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user._id) return;

    dispatch(fetchUser());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(setBoards({ data }));
  }, [dispatch, data]);

  return (
    <div className="flex-1 min-h-screen pt-4 px-30">
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
        <BoardContainer icon={<Clock/>} title="Recently viewed">
          {user.recentBoards.map((b) => (
            <BoardItem board={b.board} key={b.board._id} type="primary" />
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
            sideOffset={10}
          >
            <div className="dark:bg-background">
              <CreateBoard />
            </div>
          </Popover>
        </BoardContainer>
      </BoardWorkspace>
      {/* Guest Workspace */}
      {/* <BoardWorkspace label="guest workspace" icon={<Info size={18} />}>
                <BoardContainer icon={<ChartColumnBig />} title="Trello Templates">
                    <Board type="primary" title="My trello board" img={'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg'} />
                </BoardContainer>
            </BoardWorkspace> */}
    </div>
  );
};

export default Boards;
