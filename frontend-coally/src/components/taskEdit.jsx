import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskDetail, updateTask } from '../actions/taskActions';
import { useParams, useNavigate } from 'react-router-dom';

const TaskEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskDetailState = useSelector((state) => state.tasks);
  const { loading, task, error } = taskDetailState;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState(false);

  useEffect(() => {
    if (task && task._id === id) {
      setTitle(task.title);
      setDescription(task.description);
      setState(task.state);
    } else {
      dispatch(fetchTaskDetail(id));
    }
  }, [dispatch, id, task]);

  const handleSaveClick = () => {
    dispatch(updateTask({ id, title, description, state }));
    navigate(`/tasks/${id}`);
  };

  return (
    <div className='container mx-auto p-4'>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className='bg-white p-4 rounded-lg shadow'>
          <h2 className='text-xl font-semibold'>Edit Task</h2>
          <div className='mb-4'>
            <label className='block text-gray-700'>Title</label>
            <input
              type='text'
              className='w-full p-2 border rounded'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Description</label>
            <textarea
              className='w-full p-2 border rounded'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>State</label>
            <select
              className='w-full p-2 border rounded'
              value={state}
              onChange={(e) => setState(e.target.value === 'true')}
            >
              <option value='false'>Pending</option>
              <option value='true'>Completed</option>
            </select>
          </div>
          <button
            className='mt-4 px-4 py-2 bg-green-500 text-white rounded'
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskEdit;