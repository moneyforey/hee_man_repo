import React from 'react';
import { Route,Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import Exam from "./components/Exam/Exam";
import Study from "./components/Studymaterial/Study";
import Login from './components/Login/Login';
import User from './components/User/User';
import Talentfest from './components/Talentfest/Talentfest';
import Complaints from './components/Complaints/Complaints';
import Blog from './components/Blog/Blog';
import Sales from './components/Sales/Sales';
import Analytics from './components/Analytics/Analytics';
import Department from './components/User/Department';
import ParticularDeparment from './components/User/ParticularDeparment';
import Banner from './components/BannerImage/Banner.jsx';
import Task from './components/Task/Task';
import Room from './components/Room/Room';
import Withdrawal from './components/Withdrawal/Withdrawal';
import { WithdrawalContextProvider } from './components/Utils/WithdrawalContextProvider';

const App = () => {
  return (
   <>

      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path="/Home" element={<Home/>}/>
        <Route exact path="/Exam" element={<Exam/>}/>
        <Route exact path="/Study" element={<Study/>}/>
        <Route exact path="/User" element={<User/>}/>
        <Route exact path="/Talentfest" element={<Talentfest/>}/>
        <Route exact path="/Complaints" element={<Complaints/>}/>
        <Route exact path="/Blogs" element={<Blog/>}/>
        <Route exact path="/Sales" element={<Sales/>}/>
        <Route exact path="/Analytics" element={<Analytics/>}/>
        <Route exact path='/department' element={<Department/>}/>
        <Route exact path='/department/:id' element={<ParticularDeparment/>}/>
        <Route exact path="/Banner" element={<Banner/>}/>
        <Route exact path="/Task" element={<Task/>}/>
        <Route exact path="/Rooms" element={<Room/>}/>
        <Route exact path='/withdrawal' element={
          <WithdrawalContextProvider>
        <Withdrawal/>
         </WithdrawalContextProvider>
        }/>
      </Routes>
     
   </>
  )
}

export default App;
