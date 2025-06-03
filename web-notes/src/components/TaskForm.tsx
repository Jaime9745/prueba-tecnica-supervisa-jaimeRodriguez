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
      newErrors.title = "Title is required";
    } else if (formData.title.length > 150) {
      newErrors.title = "Title must be 150 characters or less";
    }

    if (formData.description.length > 1000) {
      newErrors.description = "Description must be 1000 characters or less";
    }

    if (!selectedDate) {
      newErrors.due_date = "Due date is required";
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Task" : "Create New Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter task title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter task description (optional)"
              className={errors.description ? "border-red-500" : ""}
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>{" "}
          <div>
            <label
              htmlFor="due_date"
              className="block text-sm font-medium mb-1"
            >
              Due Date *
            </label>
            <DatePicker
              date={selectedDate}
              onDateChange={setSelectedDate}
              placeholder="Select due date"
              className={errors.due_date ? "border-red-500" : ""}
            />
            {errors.due_date && (
              <p className="text-red-500 text-sm mt-1">{errors.due_date}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium mb-1"
            >
              Priority
            </label>
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData({ ...formData, priority: value as Priority })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as Status })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
