import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tasks from './components/tasks';
import TaskDetail from './components/taskdetail';
import TaskEdit from './components/taskEdit';


function App() {
  return (
    <Router>
      <div className='p-14 '>
          <Routes>
            <Route path="/tasks" element={<Tasks/>}  />
            <Route path="/tasks/:id" element={<TaskDetail/>}  />
            <Route path="/tasks/edit/:id" element={<TaskEdit />} />
          </Routes>
      </div>
    </Router>
  );
}
export default App;
/** bg-slate-900 */