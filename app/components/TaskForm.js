'use client'

import { useRef, useState } from 'react';
import { addTask } from '../lib/actions';

export default function TaskForm() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function action(formData) {
    setIsSubmitting(true);
    const result = await addTask(formData);
    if (!result.error) {
      formRef.current?.reset();
    }
    setIsSubmitting(false);
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center animate-fade-in">
            Create New Task
          </h2>
          
          <form 
            ref={formRef} 
            action={action} 
            className="space-y-6 transform transition-all duration-300"
          >
            <div className="group">
              <label 
                htmlFor="title" 
                className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-blue-600"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                placeholder="Enter task title"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none transform hover:shadow-md"
              />
            </div>

            <div className="group">
              <label 
                htmlFor="description" 
                className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-blue-600"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="4"
                placeholder="Enter task description"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none transform hover:shadow-md resize-none"
              ></textarea>
            </div>

            <div className="group">
              <label 
                htmlFor="dueDate" 
                className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-blue-600"
              >
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none transform hover:shadow-md"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 transform
                ${isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg'
                }
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Add Task'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}