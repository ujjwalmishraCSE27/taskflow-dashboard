import { Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ id, title, completed, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:shadow-md transition-all duration-300 animate-fade-in group">
      <Checkbox
        id={id}
        checked={completed}
        onCheckedChange={() => onToggle(id)}
        className="data-[state=checked]:bg-success data-[state=checked]:border-success"
      />
      <label
        htmlFor={id}
        className={`flex-1 cursor-pointer select-none transition-all duration-300 ${
          completed
            ? "text-muted-foreground line-through"
            : "text-card-foreground"
        }`}
      >
        {title}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
