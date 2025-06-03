import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, List } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import TaskFilters from "./TaskFilters";
import TaskStats from "./TaskStats";
import type { Task, Priority, Status } from "@/types/task";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    taskId: string | null;
    taskTitle: string;
  }>({
    isOpen: false,
    taskId: null,
    taskTitle: "",
  }); // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  // Filter tasks
  useEffect(() => {
    let filtered = [...tasks];

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((task) =>
        selectedStatuses.includes(task.status)
      );
    }

    if (selectedPriorities.length > 0) {
      filtered = filtered.filter((task) =>
        selectedPriorities.includes(task.priority)
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, selectedStatuses, selectedPriorities]);

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData: any) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create task");
      }

      await fetchTasks(); // Refresh tasks
      setIsFormOpen(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create task");
    }
  };

  const handleUpdateTask = async (taskData: any) => {
    if (!editingTask) return;

    try {
      const response = await fetch(`/api/tasks/${editingTask.task_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update task");
      }

      await fetchTasks(); // Refresh tasks
      setEditingTask(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update task");
    }
  };
  const handleDeleteTask = async (taskId: string) => {
    const task = tasks.find((t) => t.task_id === taskId);
    if (!task) return;

    setDeleteDialog({
      isOpen: true,
      taskId: taskId,
      taskTitle: task.title,
    });
  };
  const confirmDeleteTask = async () => {
    const { taskId } = deleteDialog;
    if (!taskId) return;

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to delete task");
      }

      await fetchTasks(); // Refresh tasks

      // Close the dialog
      setDeleteDialog({
        isOpen: false,
        taskId: null,
        taskTitle: "",
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleClearFilters = () => {
    setSelectedStatuses([]);
    setSelectedPriorities([]);
  };
  if (loading) {
    return null;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl">Gestor de Tareas</CardTitle>
            <p className="text-gray-600 mt-1">
              {filteredTasks.length} de {tasks.length} tareas
            </p>
          </div>

          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Tarea
          </Button>
        </CardHeader>
      </Card>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 order-1 lg:order-1">
          <TaskFilters
            selectedStatuses={selectedStatuses}
            selectedPriorities={selectedPriorities}
            onStatusChange={setSelectedStatuses}
            onPriorityChange={setSelectedPriorities}
            onClearFilters={handleClearFilters}
          />

          {/* Task Statistics - Hidden on mobile, shown in sidebar on lg+ */}
          <div className="mt-6 hidden lg:block">
            <TaskStats tasks={tasks} />
          </div>
        </div>

        {/* Tasks Grid/List */}
        <div className="lg:col-span-3 order-2 lg:order-2">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">
                {tasks.length === 0
                  ? "No hay tareas todavía"
                  : "No hay tareas que coincidan con tus filtros"}
              </div>
              <div className="text-gray-400">
                {tasks.length === 0
                  ? "Crea tu primera tarea para comenzar"
                  : "Intenta ajustar tus filtros"}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.task_id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Task Statistics - Shown at the end on mobile */}
        <div className="lg:hidden order-3">
          <TaskStats tasks={tasks} />
        </div>
      </div>
      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateTask}
      />{" "}
      {/* Edit Task Form Modal */}
      <TaskForm
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdateTask}
        task={editingTask}
        isEdit={true}
      />
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteDialog({
              isOpen: false,
              taskId: null,
              taskTitle: "",
            });
          }
        }}
      >
        <AlertDialogContent>
          {" "}
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Tarea</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar "
              <strong>{deleteDialog.taskTitle}</strong>"? Esta acción no se
              puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteTask}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Eliminar Tarea
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
