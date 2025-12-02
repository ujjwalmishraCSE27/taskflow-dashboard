import { useState, useEffect } from "react";
import { Dashboard } from "@/components/Dashboard";
import { TaskInput } from "@/components/TaskInput";
import { TaskList, Task } from "@/components/TaskList";
import { TaskFilters, FilterType } from "@/components/TaskFilters";
import { MiniCalendar } from "@/components/MiniCalendar";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeView, setActiveView] = useState("tasks");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Dashboard tasks={tasks} activeView={activeView} onViewChange={setActiveView} />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {activeView === "dashboard" && "Dashboard"}
                {activeView === "tasks" && "My Tasks"}
                {activeView === "calendar" && "Calendar"}
              </h2>
              <p className="text-muted-foreground">
                {activeView === "dashboard" && "Overview of your productivity"}
                {activeView === "tasks" && "Manage your daily tasks efficiently"}
                {activeView === "calendar" && "Plan your schedule"}
              </p>
            </div>
            <ThemeToggle />
          </div>

          {/* Dashboard View */}
          {activeView === "dashboard" && (
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                  <p className="text-sm text-muted-foreground mb-2">Total Tasks</p>
                  <p className="text-4xl font-bold text-primary">{tasks.length}</p>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                  <p className="text-sm text-muted-foreground mb-2">Completed</p>
                  <p className="text-4xl font-bold text-success">
                    {tasks.filter((t) => t.completed).length}
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                  <p className="text-sm text-muted-foreground mb-2">Pending</p>
                  <p className="text-4xl font-bold text-warning">
                    {tasks.filter((t) => !t.completed).length}
                  </p>
                </div>
              </div>
              <MiniCalendar />
            </div>
          )}

          {/* Tasks View */}
          {activeView === "tasks" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                <TaskInput onAddTask={addTask} />
              </div>

              <TaskFilters currentFilter={filter} onFilterChange={setFilter} />

              <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
              </div>
            </div>
          )}

          {/* Calendar View */}
          {activeView === "calendar" && (
            <div className="grid gap-6">
              <MiniCalendar />
              <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Tasks for Today
                </h3>
                <TaskList
                  tasks={tasks.filter((t) => !t.completed).slice(0, 5)}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
