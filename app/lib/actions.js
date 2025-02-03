'use server'

import { revalidatePath } from 'next/cache';
import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

export async function getTasks() {
  try {
    const client = await clientPromise;
    const db = client.db("taskmanager");
    const tasks = await db.collection("tasks")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return { tasks };
  } catch (error) {
    return { error: "Failed to fetch tasks" };
  }
}

export async function addTask(formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const dueDate = formData.get('dueDate');

  try {
    const client = await clientPromise;
    const db = client.db("taskmanager");
    await db.collection("tasks").insertOne({
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date(),
    });
    revalidatePath('/');
    return { message: "Task added successfully" };
  } catch (error) {
    return { error: "Failed to add task" };
  }
}

export async function updateTask(formData) {
  const id = formData.get('id');
  const title = formData.get('title');
  const description = formData.get('description');
  const dueDate = formData.get('dueDate');

  try {
    const client = await clientPromise;
    const db = client.db("taskmanager");
    await db.collection("tasks").updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description, dueDate } }
    );
    revalidatePath('/');
    return { message: "Task updated successfully" };
  } catch (error) {
    return { error: "Failed to update task" };
  }
}

export async function toggleTask(formData) {
  const id = formData.get('id');
  const completed = formData.get('completed') === 'true';

  try {
    const client = await clientPromise;
    const db = client.db("taskmanager");
    await db.collection("tasks").updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed: !completed } }
    );
    revalidatePath('/');
    return { message: "Task status updated" };
  } catch (error) {
    return { error: "Failed to update task status" };
  }
}

export async function deleteTask(formData) {
  const id = formData.get('id');

  try {
    const client = await clientPromise;
    const db = client.db("taskmanager");
    await db.collection("tasks").deleteOne({ _id: new ObjectId(id) });
    revalidatePath('/');
    return { message: "Task deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete task" };
  }
}