import { Button } from "@/components/ui/button";

export type FilterType = "all" | "pending" | "completed";

interface TaskFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TaskFilters = ({ currentFilter, onFilterChange }: TaskFiltersProps) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className={
            currentFilter === filter.value
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-card text-card-foreground hover:bg-secondary"
          }
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};
