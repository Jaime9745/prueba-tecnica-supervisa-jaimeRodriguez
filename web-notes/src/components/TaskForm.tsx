import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import type { Task, Priority, Status } from "@/types/task";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
  task?: Task | null;
  isEdit?: boolean;
}

export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  task,
  isEdit = false,
}: TaskFormProps) {
  // Parse the due_date string to Date object for existing tasks
  const parseDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    try {
      return parse(dateString, "dd/MM/yyyy", new Date());
    } catch {
      return undefined;
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as Priority,
    status: "pending" as Status,
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when task prop changes (for editing)
  useEffect(() => {
    if (task && isEdit) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        status: task.status || "pending",
      });
      setSelectedDate(parseDate(task.due_date || ""));
    } else {
      // Reset form for new task
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
      });
      setSelectedDate(undefined);
    }
    setErrors({});
  }, [task, isEdit]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio";
    } else if (formData.title.length > 150) {
      newErrors.title = "El título debe tener 150 caracteres o menos";
    }

    if (formData.description.length > 1000) {
      newErrors.description =
        "La descripción debe tener 1000 caracteres o menos";
    }

    if (!selectedDate) {
      newErrors.due_date = "La fecha de vencimiento es obligatoria";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Prepare the data for submission
    const submitData = {
      ...formData,
      due_date: selectedDate ? format(selectedDate, "dd/MM/yyyy") : "",
    };

    onSubmit(submitData);
    handleClose();
  };
  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
    });
    setSelectedDate(undefined);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {" "}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar Tarea" : "Crear Nueva Tarea"}
          </DialogTitle>
        </DialogHeader>{" "}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-full overflow-hidden"
        >
          <div className="w-full">
            {" "}
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Título *
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Ingresa el título de la tarea"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>{" "}
          <div className="w-full">
            {" "}
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Descripción
            </label>
            <div className="w-full">
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Ingresa la descripción de la tarea (opcional)"
                className={errors.description ? "border-red-500" : ""}
              />
              <div className="flex justify-end mt-1">
                <span
                  className={`text-xs ${
                    formData.description.length > 1000
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {formData.description.length}/1000
                </span>
              </div>
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>{" "}
          <div className="w-full">
            {" "}
            <label
              htmlFor="due_date"
              className="block text-sm font-medium mb-1"
            >
              Fecha de Vencimiento *
            </label>
            <DatePicker
              date={selectedDate}
              onDateChange={setSelectedDate}
              placeholder="Seleccionar fecha de vencimiento"
              className={`w-full ${errors.due_date ? "border-red-500" : ""}`}
            />
            {errors.due_date && (
              <p className="text-red-500 text-sm mt-1">{errors.due_date}</p>
            )}
          </div>
          <div className="w-full">
            {" "}
            <label
              htmlFor="priority"
              className="block text-sm font-medium mb-1"
            >
              Prioridad
            </label>{" "}
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData({ ...formData, priority: value as Priority })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baja</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            {" "}
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Estado
            </label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as Status })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="completed">Completada</SelectItem>
              </SelectContent>
            </Select>
          </div>{" "}
          <div className="flex justify-end space-x-2 pt-4 w-full">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEdit ? "Actualizar Tarea" : "Crear Tarea"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
