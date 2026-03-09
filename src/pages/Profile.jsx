import { Navigate, useNavigate } from "react-router-dom"
import Header from './Header'
import './styles/Profile.css'

export default function Profile(){

    const navigate = useNavigate();

    return(
        <div>
            <Header activeLink = 'profile' />
            <div className="profile-main-content">
                <p>page does not yet exist</p>
                <button className="btn primary large" onClick={()=> navigate('/dashboard')}>back home</button>
            </div>
        </div>
    )
}