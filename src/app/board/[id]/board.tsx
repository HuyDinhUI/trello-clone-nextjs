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
} from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { Column } from "@/components/boards/columns";
import { Card, ListCard } from "@/components/boards/card";
import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholdeCard } from "@/utils/formatters";
import API from "@/utils/axios";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AppDispatch, RootState } from "@/store";
import {
  closeBoard,
  fetchBoard,
  setColumn,
  updateBoard,
} from "@/store/boardSlice";
import { SkeletonBoardPage } from "@/components/ui/skeleton";
import { customCollisionDetection } from "@/lib/collisionDetection";
import { Input } from "@/components/ui/input";
import { Board as BoardType } from "@/types/board.type";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { BoardService } from "@/services/board-service";
import { updateRecentBoard } from "@/store/userSlice";
import { UserService } from "@/services/user-service";
import { DropdownMenu } from "@/components/ui/dropdown";
import { MenuItem } from "@/types/menu-item/menu-item-type";
import { FormChangeCover, FormChangeVisibility } from "@/components/boards/form-actions";
import { AlertDialogCloseBoard } from "@/mock/AlertDialog-MockData";

const TYPE_ACTIVE_DND = {
  COLUMN: "T_COLUMN",
  CARD: "T_CARD",
};

const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch<AppDispatch>();
  const { board, columns, loading } = useAppSelector(
    (state: RootState) => state.board
  );

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(pointerSensor);
  const [activeDragItemId, setActiveDragItemId] = useState<string | null>(null);
  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(
    null
  );
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchBoard(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!board._id) return;

    dispatch(updateRecentBoard({ board }));
    const handleUpdateRecent = async () => {
      await UserService.updateRecentBoardAsync(board._id!);
    };

    handleUpdateRecent();
  }, [dispatch, board]);

  const findColumn = (cardId: any) => {
    return columns?.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };

  const HandleDragStart = (event: any) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? TYPE_ACTIVE_DND.CARD
        : TYPE_ACTIVE_DND.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  const HandleDragOver = (event: any) => {
    if (activeDragItemType === TYPE_ACTIVE_DND.COLUMN) return;

    const { active, over } = event;

    if (!over) return;

    const {
      id: activeDrappingCardId,
      data: { current: activeDrappingCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumn(activeDrappingCardId);
    const overColumn = findColumn(overCardId);

    if (!activeColumn || !overColumn) return;

    const overCardIndex = overColumn?.cards?.findIndex(
      (card) => card._id === overCardId
    );

    const isBelowOverItem =
      active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height;
    const modifier = isBelowOverItem ? 1 : 0;
    const newCardIndex =
      overCardIndex >= 0
        ? overCardIndex + modifier
        : overColumn?.cards?.length + 1;

    const nextColumns = cloneDeep(columns);
    const nextActiveColumn = nextColumns?.find(
      (column) => column._id === activeColumn._id
    );
    const nextOverColumn = nextColumns?.find(
      (column) => column._id === overColumn._id
    );

    // xoá card đang kéo khỏi column chứa card đang kéo
    if (nextActiveColumn) {
      nextActiveColumn.cards = nextActiveColumn.cards.filter(
        (card) => card._id !== activeDrappingCardId
      );

      if (isEmpty(nextActiveColumn.cards)) {
        nextActiveColumn.cards = [generatePlaceholdeCard(nextActiveColumn)];
      }
    }

    // thêm card đang kéo vào column được thả vào
    if (nextOverColumn) {
      nextOverColumn.cards = nextOverColumn.cards.filter(
        (card) => card._id !== activeDrappingCardId
      );
      nextOverColumn.cards.splice(newCardIndex, 0, activeDrappingCardData);
      nextOverColumn.cards = nextOverColumn.cards.map((card) =>
        card._id === activeDrappingCardId
          ? { ...card, columnId: overColumn._id }
          : card
      );

      nextOverColumn.cards = nextOverColumn.cards.filter(
        (card) => !card.FE_placeholderCard
      );
    }
    console.log("nextColumns: ", nextColumns);
    dispatch(setColumn(nextColumns));
  };

  const HandleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (activeDragItemType === TYPE_ACTIVE_DND.CARD) {
      try {
        await API.put("/card/updateOrderAndPosition", {
          boardId: id,
          columns: columns,
        });
      } catch (err: any) {
        toast.error(err?.response?.data?.message);
      }
    }

    if (activeDragItemType === TYPE_ACTIVE_DND.COLUMN && columns) {
      const oldIndex = columns?.findIndex((c) => c._id === active.id);
      const newIndex = columns?.findIndex((c) => c._id === over.id);

      const NewColumnData = arrayMove(columns, oldIndex, newIndex);
      dispatch(setColumn(NewColumnData));

      try {
        const res = await API.put(`/boards/reorderColumn/${id}`, {
          columnsOrder: NewColumnData.map((c) => c._id),
        });
        console.log(res);
      } catch (err: any) {
        toast.error(err?.response?.data?.message);
      }
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

  if (loading) return <SkeletonBoardPage />;

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
                      boardId={activeDragItemData.boardId}
                    >
                      <ListCard items={activeDragItemData.card} />
                    </Column>
                  )}
                {activeDragItemId &&
                  activeDragItemType === TYPE_ACTIVE_DND.CARD && (
                    <Card item={activeDragItemData} />
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
  const dispatch = useAppDispatch<AppDispatch>();
  const [openInput, setOpenInput] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);

  const handleStarred = async (starred: boolean) => {
    dispatch(updateBoard({ field: "starred", value: starred }));
    await BoardService.starred(board._id!, starred);
  };

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (input.current && !input.current.contains(event.target as Node)) {
        dispatch(updateBoard({ field: "title", value: input.current.value }));
        setOpenInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const MenuItemBoard: MenuItem[] = [
    {
      label: "Share",
      icon: <UserPlus size={15} />,
      disabled: true
    },
    { separator: true },
    {
      label: "About this board",
      icon: <Info size={15} />,
      disabled: true
    },
    {
      label: `Visibility: ${board.visibility}`,
      icon: <Users size={15} />,
      elementPopup: <FormChangeVisibility/>
    },
    {
      label: `Print, export, and share`,
      icon: <Share2 size={15} />,
      disabled: true
    },
    {
      label: !board.starred ? "Star" : "Unstar",
      icon: !board.starred ? (
        <IconStar size={15} />
      ) : (
        <IconStarFilled size={15} color="#ffb703" />
      ),
      onClick() {
        handleStarred(!board.starred)
      },
    },
    { separator: true },
    {
      label: "Setting",
      icon: <Settings size={15} />,
      disabled: true
    },
    {
      label: "Change background",
      icon: (
        <div
          style={{ backgroundImage: `url(${board.cover})` }}
          className="w-5 h-5 bg-cover rounded-sm"
        ></div>
      ),
      elementPopup: <FormChangeCover/>
    },
    { separator: true },
    {
      label: "Close board",
      icon: <Minus size={15} />,
      dialog: AlertDialogCloseBoard,
      onClick() {
        dispatch(closeBoard());
      },
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
