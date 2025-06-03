import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import type { Priority, Status } from '@/types/task';

interface TaskFiltersProps {
  selectedStatuses: Status[];
  selectedPriorities: Priority[];
  onStatusChange: (statuses: Status[]) => void;
  onPriorityChange: (priorities: Priority[]) => void;
  onClearFilters: () => void;
}

export default function TaskFilters({
  selectedStatuses,
  selectedPriorities,
  onStatusChange,
  onPriorityChange,
  onClearFilters,
}: TaskFiltersProps) {
  const statuses: Status[] = ['pending', 'in_progress', 'completed'];
  const priorities: Priority[] = ['low', 'medium', 'high'];

  const handleStatusToggle = (status: Status) => {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter(s => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  };

  const handlePriorityToggle = (priority: Priority) => {
    if (selectedPriorities.includes(priority)) {
      onPriorityChange(selectedPriorities.filter(p => p !== priority));
    } else {
      onPriorityChange([...selectedPriorities, priority]);
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getStatusColor = (status: string, isSelected: boolean) => {
    const baseClasses = isSelected ? '' : 'bg-gray-100 text-gray-600 hover:bg-gray-200';
    if (!isSelected) return baseClasses;
    
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return baseClasses;
    }
  };

  const getPriorityColor = (priority: string, isSelected: boolean) => {
    const baseClasses = isSelected ? '' : 'bg-gray-100 text-gray-600 hover:bg-gray-200';
    if (!isSelected) return baseClasses;
    
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return baseClasses;
    }
  };

  const hasActiveFilters = selectedStatuses.length > 0 || selectedPriorities.length > 0;

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-sm"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Status</h4>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => {
              const isSelected = selectedStatuses.includes(status);
              return (
                <Badge
                  key={status}
                  variant="secondary"
                  className={`cursor-pointer transition-colors ${getStatusColor(status, isSelected)}`}
                  onClick={() => handleStatusToggle(status)}
                >
                  {formatStatus(status)}
                </Badge>
              );
            })}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Priority</h4>
          <div className="flex flex-wrap gap-2">
            {priorities.map((priority) => {
              const isSelected = selectedPriorities.includes(priority);
              return (
                <Badge
                  key={priority}
                  variant="secondary"
                  className={`cursor-pointer transition-colors ${getPriorityColor(priority, isSelected)}`}
                  onClick={() => handlePriorityToggle(priority)}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
