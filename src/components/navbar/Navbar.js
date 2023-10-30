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
function Navbar(){
    const {toggle,darkMode} =useContext(DarkModeContext)
    return(
        <div className = 'navbar'>
            <div className='left'>
                <Link to={'/'} style={{textDecoration:'none'}}>
                <span>EEgram</span>
                </Link>
                <HomeOutlinedIcon/>
                {!darkMode? <DarkModeOutlinedIcon style={{cursor:'pointer'}} onClick={()=>toggle()}/> : <WbSunnyOutlinedIcon onClick={()=>toggle()} style={{cursor:'pointer'}}/>}
                <GridViewOutlinedIcon/>
                <div className='search'>
                    <SearchOutlinedIcon/>
                    <input type='text' placeholder='Search...'/>
                </div>
            </div>
            <div className='right'>
                <PersonOutlinedIcon/>
                <EmailOutlinedIcon/>
                <NotificationsNoneOutlinedIcon/>
                <div className ='user'>
                    <img src='https://images.pexels.com/photos/18704284/pexels-photo-18704284.jpeg?cs=srgb&dl=pexels-phong-vo-18704284.jpg&fm=jpg' alt='avatar'/>
                    <span>Ehsan Espandar</span>
                </div>
            </div>

        </div>
    )
}

export default Navbar;