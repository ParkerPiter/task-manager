import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, createTask, setFilter } from '../actions/taskActions';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus } from 'react-icons/fa'; // Importar los íconos

const Tasks = () => {
  const dispatch = useDispatch();
  const tasksState = useSelector((state) => state.tasks);
  const { loading, tasks, error, filter } = tasksState;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', state: false });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDetailClick = (id) => {
    navigate(`/tasks/${id}`);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveTask = () => {
    dispatch(createTask(newTask));
    setShowModal(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.state === true;
    if (filter === 'pending') return task.state === false;
    return true;
  });

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Tasks</h1>
      <div className='mb-4 flex flex-col md:flex-row justify-between'>
        <button
          className='mb-2 md:mb-0 px-4 py-2 bg-green-500 text-white rounded flex items-center'
          onClick={handleCreateClick}
        >
          <FaPlus className='mr-2' /> Create Task
        </button>
        <div className='flex flex-wrap'>
          <button
            className={`px-4 py-2 mr-2 mb-2 md:mb-0 ${filter === 'all' ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
            onClick={() => dispatch(setFilter('all'))}
          >
            All
          </button>
          <button
            className={`px-4 py-2 mr-2 mb-2 md:mb-0 ${filter === 'completed' ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
            onClick={() => dispatch(setFilter('completed'))}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2  ${filter === 'pending' ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
            onClick={() => dispatch(setFilter('pending'))}
          >
            Pending
          </button>
        </div>
      </div>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredTasks.map((task) => (
            <div key={task._id} className='bg-yellow-200 p-4 rounded-lg shadow relative'>
              <button
                className='absolute top-2 right-2 text-red-500'
                onClick={() => handleDeleteClick(task._id)}
              >
                <FaTrash />
              </button>
              <h2 className='text-xl font-semibold'>{task.title}</h2>
              <p className='text-gray-700'>{task.description}</p>
              <p className='text-gray-500'>Created on {new Date(task.date).toLocaleDateString()}</p>
              <p className='text-gray-500'>{task.state ? 'Completed' : 'Pending'}</p>
              <button
                className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
                onClick={() => handleDetailClick(task._id)}
              >
                Detail
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-xl font-semibold mb-4'>Create New Task</h2>
            <div className='mb-4'>
              <label className='block text-gray-700'>Title</label>
              <input
                type='text'
                className='w-full p-2 border rounded'
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Description</label>
              <textarea
                className='w-full p-2 border rounded'
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>State</label>
              <select
                className='w-full p-2 border rounded'
                value={newTask.state}
                onChange={(e) => setNewTask({ ...newTask, state: e.target.value === 'true' })}
              >
                <option value='false'>Pending</option>
                <option value='true'>Completed</option>
              </select>
            </div>
            <div className='flex justify-end'>
              <button
                className='mr-2 px-4 py-2 bg-gray-500 text-white rounded'
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className='px-4 py-2 bg-green-500 text-white rounded'
                onClick={handleSaveTask}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;