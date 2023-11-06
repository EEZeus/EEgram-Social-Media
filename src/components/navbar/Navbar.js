import './Navbar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../Context/DarkModeContext';
import { AuthContext } from '../../Context/AuthContext';
function Navbar(){
    const {toggle,darkMode} =useContext(DarkModeContext)
    const {currentUser}= useContext(AuthContext)
    return(
        <div className = 'navbar'>
            <div className='left'>
                <Link to={'/'} style={{textDecoration:'none'}}>
                <span>EEgram</span>
                </Link>
                <Link to={'/'} style={{textDecoration:'none',color: "inherit",
                  cursor: "pointer",}}>
                <HomeOutlinedIcon/>
                </Link>
                {!darkMode? <DarkModeOutlinedIcon style={{cursor:'pointer'}} onClick={()=>toggle()}/> : <WbSunnyOutlinedIcon onClick={()=>toggle()} style={{cursor:'pointer'}}/>}
                <GridViewOutlinedIcon/>
                <div className='search'>
                    <SearchOutlinedIcon/>
                    <input type='text' placeholder='Search...'/>
                </div>
            </div>
            <div className='right'>
                <PersonOutlinedIcon/>
                <div className='email-icon'>
                <EmailOutlinedIcon/>
                </div>
                <div className='notif-icon'>
                <NotificationsNoneOutlinedIcon/>
                </div>
                <div className ='user'>
                    <img src={currentUser.profilePic} alt='avatar'/>
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
            
    )
}

export default Navbar;