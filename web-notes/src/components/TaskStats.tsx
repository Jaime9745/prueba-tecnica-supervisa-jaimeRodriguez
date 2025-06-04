import { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import type { Task } from "@/types/task";

interface TaskStatsProps {
  tasks: Task[];
}

const COLORS = {
  pending: "#d1d5db", // Gray for pending (matches gray-300 for better visibility)
  in_progress: "#93c5fd", // Blue for in progress (matches blue-300 for better visibility)
  completed: "#86efac", // Green for completed (matches green-300 for better visibility)
};

const STATUS_LABELS = {
  pending: "Pendiente",
  in_progress: "En Progreso",
  completed: "Completada",
};

export default function TaskStats({ tasks }: TaskStatsProps) {
  const chartData = useMemo(() => {
    const statusCounts = {
      pending: 0,
      in_progress: 0,
      completed: 0,
    };

    tasks.forEach((task) => {
      statusCounts[task.status]++;
    });

    return Object.entries(statusCounts)
      .map(([status, count]) => ({
        status,
        count,
        label: STATUS_LABELS[status as keyof typeof STATUS_LABELS],
        fill: COLORS[status as keyof typeof COLORS],
      }))
      .filter((item) => item.count > 0); // Only show statuses with tasks
  }, [tasks]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const chartConfig = {
    pending: {
      label: "Pendiente",
      color: "#d1d5db", // Gray for pending (matches gray-300)
    },
    in_progress: {
      label: "En Progreso",
      color: "#93c5fd", // Blue for in progress (matches blue-300)
    },
    completed: {
      label: "Completada",
      color: "#86efac", // Green for completed (matches green-300)
    },
  };

  if (totalTasks === 0) {
    return (
      <Card>
        {" "}
        <CardHeader>
          <CardTitle>Estadísticas de Tareas</CardTitle>
          <CardDescription>Resumen de tu progreso en tareas</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">
            No hay tareas aún. ¡Crea tu primera tarea para ver estadísticas!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {" "}
      <CardHeader>
        <CardTitle>Estadísticas de Tareas</CardTitle>
        <CardDescription>
          {totalTasks} tareas totales • {completionRate}% tasa de completitud
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />{" "}
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>{" "}
          </PieChart>
        </ChartContainer>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">
              {tasks.filter((t) => t.status === "pending").length}
            </div>{" "}
            <div className="text-sm text-muted-foreground">Pendiente</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">
              {tasks.filter((t) => t.status === "in_progress").length}
            </div>
            <div className="text-sm text-muted-foreground">En Progreso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">
              {completedTasks}
            </div>
            <div className="text-sm text-muted-foreground">Completada</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
