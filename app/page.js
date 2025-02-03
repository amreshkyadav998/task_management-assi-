import { getTasks } from './lib/actions';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default async function Home() {
  const { tasks, error } = await getTasks();

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
      <div className="grid gap-8">
        <TaskForm />
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>
    </main>
  );
}