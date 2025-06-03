import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Calendar } from "lucide-react";
import type { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "pending":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  const formatStatus = (status: string) => {
    if (status === "pending") return "Pendiente";
    if (status === "in_progress") return "En Progreso";
    if (status === "completed") return "Completada";
    return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatPriority = (priority: string) => {
    if (priority === "low") return "Baja";
    if (priority === "medium") return "Media";
    if (priority === "high") return "Alta";
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold line-clamp-2 flex-1">
            {task.title}
          </h3>
          <div className="flex gap-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1">
          {task.description && (
            <p className="text-sm text-gray-600 mb-3">
              {truncateText(task.description)}
            </p>
          )}

          {task.due_date && (
            <div className="text-sm text-gray-500 mb-3 flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1 opacity-70" />
              {task.due_date}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          <Badge className={getPriorityColor(task.priority)}>
            {formatPriority(task.priority)}
          </Badge>
          <Badge className={getStatusColor(task.status)}>
            {formatStatus(task.status)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
