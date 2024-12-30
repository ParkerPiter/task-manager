import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskDetail } from '../actions/taskActions';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const TaskDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskDetailState = useSelector((state) => state.tasks);
  const { loading, task, error } = taskDetailState;

  useEffect(() => {
    dispatch(fetchTaskDetail(id));
  }, [dispatch, id]);

  const handleBackClick = () => {
    navigate('/tasks');
  };

  const handleEditClick = () => {
    navigate(`/tasks/edit/${id}`);
  };

  return (
    <div className='container mx-auto p-4'>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className='bg-yellow-200 p-4 rounded-lg shadow'>
          <h2 className='text-xl font-semibold'>{task.title}</h2>
          <p className='text-gray-700'>{task.description}</p>
          <p className='text-xs text-gray-500'>Created on {new Date(task.date).toLocaleDateString()}</p>
          <p className='text-sm text-gray-500'>{task.state ? 'Completed' : 'Pending'}</p>
          
          <div className='flex' >
            <button
              className='mr-1.5  mt-4 ml-2 px-4 py-2 bg-green-500 text-white rounded flex items-center'
              onClick={handleEditClick}
            >
              <FaEdit className='mr-2' /> Edit
            </button>
            <button
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
              onClick={handleBackClick}
            >
              Back to Tasks
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default TaskDetail;