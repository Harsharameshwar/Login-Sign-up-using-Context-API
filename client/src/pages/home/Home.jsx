import {React,useContext} from 'react'
import "./home.css";
import { Context } from '../../context/Context';
export default function Home() {
  const { user} = useContext(Context);
  const PF = "http://localhost:5000/images/";
  return (
      <>
    <div className='home'>
    {!user ?
      <p className='Text'>Please login</p>:(<div className='content-class'>
        <img className="circle-img" src={PF+user.profilePic} alt="avatar_img" />
        <div class="card">
          <div class="top-card">
            <h2 class="name">{user.username}</h2>
          </div>
          <div class="bottom">
            <p class="info">{user.email}</p>
          </div>
        </div>
      </div>)}
    </div>
    </>
  )
}
