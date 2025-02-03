'use client'

import { useRef, useState } from 'react';
import { updateTask, deleteTask, toggleTask } from '../lib/actions';

export default function TaskList({ tasks }) {
  const [editingId, setEditingId] = useState(null);
  const formRef = useRef();

  if (!tasks?.length) {
    return <p className="text-center text-gray-500">No tasks found</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="bg-white rounded-lg shadow p-6">
          {editingId === task._id ? (
            <form
              ref={formRef}
              action={async (formData) => {
                await updateTask(formData);
                setEditingId(null);
              }}
              className="space-y-4"
            >
              <input type="hidden" name="id" value={task._id} />
              <input
                type="text"
                name="title"
                defaultValue={task.title}
                className="block w-full rounded-md border p-2"
              />
              <textarea
                name="description"
                defaultValue={task.description}
                rows="3"
                className="block w-full rounded-md border p-2"
              ></textarea>
              <input
                type="date"
                name="dueDate"
                defaultValue={task.dueDate}
                className="block w-full rounded-md border p-2"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </h3>
                <div className="flex gap-2">
                  <form action={toggleTask}>
                    <input type="hidden" name="id" value={task._id} />
                    <input type="hidden" name="completed" value={task.completed} />
                    <button
                      type="submit"
                      className={`px-3 py-1 rounded ${
                        task.completed ? 'bg-gray-500' : 'bg-green-500'
                      } text-white`}
                    >
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                  </form>
                  <button
                    onClick={() => setEditingId(task._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <form action={deleteTask}>
                    <input type="hidden" name="id" value={task._id} />
                    <button
                      type="submit"
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{task.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}