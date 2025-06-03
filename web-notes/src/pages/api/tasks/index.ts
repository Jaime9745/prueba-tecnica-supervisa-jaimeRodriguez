import type { APIRoute } from 'astro';
import { TaskStorage } from '../../../utils/taskStorage';

export const GET: APIRoute = async () => {
  try {
    const tasks = await TaskStorage.getAllTasks();
    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch tasks' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('Request received');
    const text = await request.text();
    console.log('Request body:', text);
    
    let taskData;
    try {
      taskData = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Validate required fields
    if (!taskData.title || taskData.title.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Title is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (taskData.title.length > 150) {
      return new Response(JSON.stringify({ error: 'Title must be 150 characters or less' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (taskData.description && taskData.description.length > 1000) {
      return new Response(JSON.stringify({ error: 'Description must be 1000 characters or less' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Set defaults
    const task = {
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      due_date: taskData.due_date,
      priority: taskData.priority || 'medium',
      status: taskData.status || 'pending',
    };

    const newTask = await TaskStorage.saveTask(task);
    
    return new Response(JSON.stringify(newTask), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create task';
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
