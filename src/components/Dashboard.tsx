import { LayoutDashboard, ListTodo, Calendar as CalendarIcon } from "lucide-react";
import { Task } from "./TaskList";

interface DashboardProps {
  tasks: Task[];
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Dashboard = ({ tasks, activeView, onViewChange }: DashboardProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Completed",
      value: completedTasks,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Pending",
      value: pendingTasks,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "Tasks", icon: ListTodo },
    { id: "calendar", label: "Calendar", icon: CalendarIcon },
  ];

  return (
    <div className="w-64 bg-card border-r border-border p-6 flex flex-col gap-8 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Task Manager</h1>
        <p className="text-sm text-muted-foreground">Stay organized and productive</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Statistics
        </h2>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bgColor} rounded-lg p-4 transition-all duration-300 hover:shadow-md`}
          >
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Navigation
        </h2>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
