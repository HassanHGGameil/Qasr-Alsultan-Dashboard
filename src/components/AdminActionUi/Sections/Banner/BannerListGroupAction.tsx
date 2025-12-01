"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil, Trash, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import AlertModal from "@/components/Modals/alert-modal";
import BannerColumnType from "@/types/BannerColmunType";

interface ListGroupActionProps {
  items: BannerColumnType[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit?: (slug: string) => void;
  onDelete?: (slug: string) => void;
}

const BannerListGroupAction = ({
  items,
  onReorder,
  onEdit,
  onDelete,
}: ListGroupActionProps) => {
  const [faqCode, setFaqCode] = useState<BannerColumnType[]>([]);
  const [search, setSearch] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Avoid hydration mismatch
  useEffect(() => setIsMounted(true), []);

  // Sync local data
  useEffect(() => {
    setFaqCode(items);
  }, [items]);

  const handleDelete = useCallback(async () => {
    if (!selectedId || !onDelete) return;
    try {
      setLoading(true);
      await onDelete(selectedId);
    } finally {
      setLoading(false);
      setOpen(false);
      setSelectedId(null);
    }
  }, [selectedId, onDelete]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;
      if (!destination || destination.index === source.index) return;

      const reordered = Array.from(faqCode);
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);
      setFaqCode(reordered);

      const updateData = reordered.map((item, index) => ({
        id: item.id,
        position: index,
      }));
      onReorder(updateData);
    },
    [faqCode, onReorder]
  );

  // 🔍 Filter list based on search term
  const filteredQrCodes = useMemo(() => {
    if (!search.trim()) return faqCode;
    const q = search.toLowerCase();
    return faqCode.filter(
      (item) =>
        item.titleEn?.toLowerCase().includes(q) ||
        item.titleEn?.toLowerCase().includes(q)
    );
  }, [faqCode, search]);

  if (!isMounted) return null;

  return (
    <>
      {/* Delete Confirmation Modal */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <div className="space-y-6">
        {/* 🔍 Search Input */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search QR code by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-10 bg-background border border-input focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-200"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearch("")}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="brandQRCodes">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3 transition-all duration-300"
              >
                {filteredQrCodes.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-sm text-muted-foreground italic">
                      {search
                        ? "No QR codes match your search."
                        : "No QR codes added yet."}
                    </p>
                  </div>
                ) : (
                  filteredQrCodes.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={cn(
                            "flex flex-wrap md:flex-nowrap items-center justify-between rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-all duration-300 group",
                            snapshot.isDragging &&
                              "shadow-lg bg-accent/10 scale-[1.02] border-primary/30"
                          )}
                        >
                          {/* Drag Handle */}
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab rounded-md p-2 text-muted-foreground hover:bg-accent/30 hover:text-foreground transition"
                          >
                            <Grip className="w-4 h-4" />
                          </div>

                          {/* QR Code info */}
                          <div className="flex items-center gap-3 flex-1 px-3 min-w-0">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-border shadow-sm">
                              <Image
                                src={item.bgOne || "/placeholder.svg"}
                                alt={item.titleEn || "QR Image"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-foreground truncate">
                                {item.titleEn}
                              </p>
                              {item.titleAr && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {item.titleAr}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1  group-hover:opacity-100 transition-opacity duration-200">
                            {onEdit && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(item.id)}
                                aria-label="Edit"
                                className="hover:bg-accent/30"
                              >
                                <Pencil className="w-4 h-4 text-foreground" />
                              </Button>
                            )}
                            {onDelete && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedId(item.id);
                                  setOpen(true);
                                }}
                                aria-label="Delete"
                                className="hover:bg-destructive/10"
                              >
                                <Trash className="w-4 h-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default BannerListGroupAction;
