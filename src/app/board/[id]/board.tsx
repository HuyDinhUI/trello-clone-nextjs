"use client";

import { ListColumns } from "@/components/boards/columns";
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
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { Column } from "@/components/boards/columns";
import { Card, ListCard } from "@/components/boards/card";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState, store } from "@/store";
import { SkeletonBoardPage } from "@/components/ui/skeleton";
import { customCollisionDetection } from "@/utils/collisionDetection";
import { Input } from "@/components/ui/input";
import { Board as BoardType } from "@/types/board.type";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { DropdownMenu } from "@/components/ui/dropdown";
import { MenuItem } from "@/types/menu-item/menu-item-type";
import {
  FormChangeCover,
  FormChangeVisibility,
} from "@/components/boards/form-actions";
import { AlertDialogCloseBoard } from "@/mock/AlertDialog-MockData";
import { BoardFacade } from "@/facades/board.facade";
import { EntityId } from "@reduxjs/toolkit";
import {
  boardsSelectors,
  columnsSelectors,
} from "@/store/board/board.selectors";
import { findColumnByCardId, getNewCardIndex } from "@/utils/helper";
import { moveCard } from "@/store/board/board.slice";
import { CardFacade } from "@/facades/card.facade";
import { UserFacade } from "@/facades/user.facade";

const TYPE_ACTIVE_DND = {
  COLUMN: "T_COLUMN",
  CARD: "T_CARD",
};

const Board = () => {
  const { id } = useParams();
  const board = useAppSelector((state: RootState) =>
    boardsSelectors.selectById(state, id as EntityId),
  );
  const columns = useAppSelector((state: RootState) =>
    columnsSelectors.selectAll(state),
  );
  const { loading, currenBoardId } = useAppSelector(
    (state: RootState) => state.board,
  );
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(pointerSensor);
  const [activeDragItemId, setActiveDragItemId] = useState<EntityId | null>(
    null,
  );
  const [activeDragItemType, setActiveDragItemType] = useState<EntityId | null>(
    null,
  );
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    BoardFacade.load(id as EntityId);
  }, [id]);

  // useEffect(() => {
  //   if (!board) return;

  //   UserFacade.updateRecentBoard(board);
  // }, []);

  const HandleDragStart = (event: DragStartEvent) => {
    setActiveDragItemId(event?.active?.id as EntityId);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? TYPE_ACTIVE_DND.CARD
        : TYPE_ACTIVE_DND.COLUMN,
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  const HandleDragOver = (event: DragOverEvent) => {
    if (activeDragItemType === TYPE_ACTIVE_DND.COLUMN) return;

    const { active, over } = event;

    if (!over) return;

    const activeCardId = active.id as string;
    const overCardId = over.id as string;

    const activeColumn = findColumnByCardId(activeCardId, columns);
    const overColumn = findColumnByCardId(overCardId, columns);

    if (!activeColumn || !overColumn) return;

    const overCardIndex = overColumn?.cards?.findIndex(
      (card) => card._id === overCardId,
    );

    const newIndex = getNewCardIndex({
      active,
      over,
      overCardIndex,
    });

    store.dispatch(
      moveCard({
        CardId: activeCardId,
        fromColumnId: activeColumn._id,
        toColumnId: overColumn._id,
        newIndex,
      }),
    );
  };

  const HandleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (activeDragItemType === TYPE_ACTIVE_DND.CARD) {
      CardFacade.updateOrderAndPosition(currenBoardId!, columns);
    }

    if (activeDragItemType === TYPE_ACTIVE_DND.COLUMN && columns) {
      const oldIndex = columns?.findIndex((c) => c._id === active.id);
      const newIndex = columns?.findIndex((c) => c._id === over.id);

      const NewColumnData = arrayMove(columns, oldIndex, newIndex);
      BoardFacade.reorderColumn(currenBoardId!, NewColumnData);
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: "0.5" } },
    }),
  };

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
    </div>
  );
};

type props = {
  board: BoardType;
};

const HeaderBoard = ({ board }: props) => {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);

  const handleStarred = async (starred: boolean) => {
    BoardFacade.starred(board._id, starred);
  };

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (input.current && !input.current.contains(event.target as Node)) {
        BoardFacade.editLabel(board._id, input.current.value);
        setOpenInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <header className="px-5 py-3 flex justify-between bg-black/30 text-white">
      <div className="flex items-center gap-2">
        {!openInput ? (
          <Button
            onClick={() => setOpenInput(true)}
            title={board.title}
            variant="transparent"
            className="font-bold"
          />
        ) : (
          <Input
            ref={input}
            defaultValue={board.title}
            variant="borderNone"
            autoFocus
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button size="ic" variant="icon" icon={<ListFilter size={18} />} />
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
        <Button icon={<Users2 size={18} />} variant="icon" size="ic" />
        <Button
          title="Share"
          icon={<UserPlus size={18} />}
          className="text-black"
          size="sm"
        />
        <DropdownMenu
          trigger={
            <Button size="ic" variant="icon" icon={<Ellipsis size={18} />} />
          }
          items={MenuItemBoard}
          label="Menu"
        />
      </div>
    </header>
  );
};

export default Board;
