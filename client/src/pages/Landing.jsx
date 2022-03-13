import { Link } from 'react-router-dom'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'



export const Landing = () => {
  return (
    <Wrapper>
        <nav>
           <Logo />
        </nav>
        <div className="container page">
            <div className="info">
                <h1>
                    job <span>tracking</span>
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                   Aut in maxime vitae exercitationem ipsa hic nostrum dolore
                   accusamus ullam esse! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <Link to='/register' className='btn btn-hero'>Login/Register</Link>
            </div>
           
            <img src={main} alt="job hunt" className="img main-img" />
        </div>
    </Wrapper>
  )
}

