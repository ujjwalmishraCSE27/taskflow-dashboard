import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

export const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = taskTitle.trim();
    
    if (trimmedTitle) {
      onAddTask(trimmedTitle);
      setTaskTitle("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-card border-border focus-visible:ring-primary"
      />
      <Button
        type="submit"
        disabled={!taskTitle.trim()}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  );
};
