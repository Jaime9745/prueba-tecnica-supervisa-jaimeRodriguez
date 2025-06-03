import { useMemo } from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import type { Task } from '@/types/task';

interface TaskStatsProps {
  tasks: Task[];
}

const COLORS = {
  pending: '#d1d5db', // Gray for pending (matches gray-300 for better visibility)
  in_progress: '#93c5fd', // Blue for in progress (matches blue-300 for better visibility)
  completed: '#86efac', // Green for completed (matches green-300 for better visibility)
};

const STATUS_LABELS = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
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

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      label: STATUS_LABELS[status as keyof typeof STATUS_LABELS],
      fill: COLORS[status as keyof typeof COLORS],
    })).filter(item => item.count > 0); // Only show statuses with tasks
  }, [tasks]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;  const chartConfig = {
    pending: {
      label: "Pending",
      color: "#d1d5db", // Gray for pending (matches gray-300)
    },
    in_progress: {
      label: "In Progress", 
      color: "#93c5fd", // Blue for in progress (matches blue-300)
    },
    completed: {
      label: "Completed",
      color: "#86efac", // Green for completed (matches green-300)
    },
  };

  if (totalTasks === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Task Statistics</CardTitle>
          <CardDescription>Overview of your task progress</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No tasks yet. Create your first task to see statistics!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Statistics</CardTitle>
        <CardDescription>
          {totalTasks} total tasks • {completionRate}% completion rate
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
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ label, count, percent }) => 
                `${label}: ${count} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color }}>
                  {value}: {entry.payload?.count || 0}
                </span>
              )}
            />
          </PieChart>
        </ChartContainer>
          {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">
              {tasks.filter(t => t.status === 'in_progress').length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">
              {completedTasks}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
