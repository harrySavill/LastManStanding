import { Navigate, useNavigate } from "react-router-dom"
import Header from './Header'

export default function Profile(){

    const navigate = useNavigate();

    return(
        <div>
            <Header activeLink = 'profile' />
            <p>page does not yet exist</p>
            <button className="btn primary large" onClick={()=> navigate('/dashboard')}>back home</button>
        </div>
    )
}