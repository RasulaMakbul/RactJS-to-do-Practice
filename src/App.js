import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';
import AddTaskForm from './components/AddTaskForm';
import UpdateForm from './components/UpdateForm';
import ToDo from './components/ToDo';

function App() {

  const [toDo,setToDo]=useState([]);

  const [newTask,setNewTask]=useState('');
  const [updateData,setUpdateData]=useState('');

  const addTask=()=>{
    if(newTask){
      let num=toDo.length+1
      let newEntry={id:num, title: newTask, status:false}
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  const deleteTask=(id)=>{
    let newTask=toDo.filter(task=>task.id !==id)
    setToDo(newTask);
  }
  
  const markDone=(id)=>{
    let newTask =toDo.map(task =>{
      if(task.id ===id){
        return({...task,status: !task.status})
      }
      return task;
    })
    setToDo(newTask)
    
  }

  
  const cancelUpdate=()=>{
    setUpdateData('');
  }
  
  const changeTask=(e)=>{
    let newEntry ={
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }
  
  const updateTask=()=>{
    let filterRecords = [...toDo].filter(task=>task.id !== updateData.id);
    let updatedObject =[...filterRecords,updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }




  return (
    <div className="container App">
      <br /> <br />
      <h1>To do List App With ReactJS</h1>
        <br /><br />
        {/* Update Task */}
        {updateData && updateData ? (
          <UpdateForm 
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
          />
        ) : (
          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
          />
        )}
        

        <br/>

        
        
        <br/>

        {toDo && toDo.length ? '' : 'No Task Available !!!'}

        <ToDo
          toDo={toDo}
          setUpdateData={setUpdateData}
          markDone={markDone}
          deleteTask={deleteTask}
        />

    </div>
  );
}

export default App;
