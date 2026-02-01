"use client";

import { ListColumns } from "@/components/column/columns";
import { Button } from "@/components/ui/button";
import {
  Ellipsis,
  UserPlus,
  Info,
  Users,
  Share2,
  Settings,
  Users2,
  ListFilter,
  Minus,
} from "lucide-react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useEffect } from "react";
import { Column } from "@/components/column/columns";
import { Card, ListCard } from "@/components/card/card";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { SkeletonBoardPage } from "@/components/ui/skeleton";
import { customCollisionDetection } from "@/utils/collisionDetection";
import { Board as BoardType } from "@/types/board.type";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { DropdownMenu } from "@/components/ui/dropdown";
import { MenuItem } from "@/types/menu-item/menu-item-type";
import {
  FormChangeCover,
  FormChangeVisibility,
} from "@/components/board/form-actions";
import { AlertDialogCloseBoard } from "@/mock/AlertDialog-MockData";
import { BoardFacade } from "@/facades/board.facade";
import { EntityId } from "@reduxjs/toolkit";
import {
  boardsSelectors,
  columnsSelectors,
} from "@/store/board/board.selectors";
import { CardDetail } from "@/components/card/card-detail";
import InlineEditor from "@/components/ui/inline-editor/inline-editor";
import useDragDrop, { TYPE_ACTIVE_DND } from "@/hooks/useDragDrop";

const Board = () => {
  const { id } = useParams();
  const board = useAppSelector((state: RootState) =>
    boardsSelectors.selectById(state, id as EntityId),
  );
  const columns = useAppSelector((state: RootState) =>
    columnsSelectors.selectAll(state),
  );
  const { isCardDetailView } = useAppSelector((state: RootState) => state.ui);
  const { loading } = useAppSelector((state: RootState) => state.board);

  const {
    sensors,
    activeDragItemId,
    activeDragItemData,
    activeDragItemType,
    HandleDragStart,
    HandleDragOver,
    HandleDragEnd,
    dropAnimation,
  } = useDragDrop(columns, id as EntityId);

  useEffect(() => {
    if (!id) return;
    BoardFacade.load(id as EntityId);
  }, [id]);

  // useEffect(() => {
  //   if (!board) return;

  //   UserFacade.updateRecentBoard(board);
  // }, []);

  if (loading || !board) return <SkeletonBoardPage />;

  return (
    <div className="flex h-full gap-5 relative">
      {board.closed && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 z-999"></div>
      )}
      <DndContext>
        <div
          className="relative flex-1 h-full flex flex-col overflow-hidden bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url('${board?.cover}')` }}
        >
          <HeaderBoard board={board} />
          <div className="flex-1 relative overflow-x-auto scroll-smooth">
            <DndContext
              onDragEnd={HandleDragEnd}
              onDragStart={HandleDragStart}
              onDragOver={HandleDragOver}
              sensors={sensors}
              collisionDetection={customCollisionDetection}
            >
              <ListColumns columns={columns ? columns : []} />
              <DragOverlay dropAnimation={dropAnimation}>
                {!activeDragItemId && null}
                {activeDragItemId &&
                  activeDragItemType === TYPE_ACTIVE_DND.COLUMN && (
                    <Column
                      label={activeDragItemData.label}
                      id={activeDragItemData.id}
                      card={activeDragItemData.card}
                    >
                      <ListCard items={activeDragItemData.card} />
                    </Column>
                  )}
                {activeDragItemId &&
                  activeDragItemType === TYPE_ACTIVE_DND.CARD && (
                    <Card CardId={activeDragItemId} />
                  )}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </DndContext>
      {isCardDetailView.open && <CardDetail />}
    </div>
  );
};

type props = {
  board: BoardType;
};

const HeaderBoard = ({ board }: props) => {
  const handleStarred = async (starred: boolean) => {
    BoardFacade.starred(board._id, starred);
  };

  const MenuItemBoard: MenuItem[] = [
    {
      label: "Share",
      icon: <UserPlus size={15} />,
      disabled: true,
    },
    { separator: true },
    {
      label: "About this board",
      icon: <Info size={15} />,
      disabled: true,
    },
    {
      label: `Visibility: ${board.visibility}`,
      icon: <Users size={15} />,
      elementPopup: <FormChangeVisibility />,
    },
    {
      label: `Print, export, and share`,
      icon: <Share2 size={15} />,
      disabled: true,
    },
    {
      label: !board.starred ? "Star" : "Unstar",
      icon: !board.starred ? (
        <IconStar size={15} />
      ) : (
        <IconStarFilled size={15} color="#ffb703" />
      ),
      onClick() {
        handleStarred(!board.starred);
      },
    },
    { separator: true },
    {
      label: "Setting",
      icon: <Settings size={15} />,
      disabled: true,
    },
    {
      label: "Change background",
      icon: (
        <div
          style={{ backgroundImage: `url(${board.cover})` }}
          className="w-5 h-5 bg-cover rounded-sm"
        ></div>
      ),
      elementPopup: <FormChangeCover />,
    },
    { separator: true },
    {
      label: "Close board",
      icon: <Minus size={15} />,
      dialog: AlertDialogCloseBoard,
      onClick() {},
    },
  ];

  return (
    <header className="px-5 py-3 flex justify-between bg-black/30">
      <div className="flex items-center gap-2">
        <InlineEditor
          actionButton={false}
          title={board.title}
          handle={(v) => BoardFacade.editLabel(board._id, v)}
          classname="hover:bg-white/10 px-2"
        >
          <div className="font-bold text-white">{board.title}</div>
        </InlineEditor>
      </div>
      <div className="flex items-center gap-2">
        {!board.starred ? (
          <Button
            onClick={() => handleStarred(true)}
            size="ic"
            variant="icon"
            icon={<IconStar size={18} />}
          />
        ) : (
          <Button
            onClick={() => handleStarred(false)}
            size="ic"
            variant="icon"
            icon={<IconStarFilled color="white" size={18} />}
          />
        )}
        <Button
          icon={<Users2 color="white" size={18} />}
          variant="icon"
          size="ic"
        />
        <Button title="Share" icon={<UserPlus size={18} />} size="sm" />
        <DropdownMenu
          trigger={
            <Button
              size="ic"
              variant="icon"
              icon={<Ellipsis size={18} color="white" />}
            />
          }
          items={MenuItemBoard}
          label="Menu"
        />
      </div>
    </header>
  );
};

export default Board;
