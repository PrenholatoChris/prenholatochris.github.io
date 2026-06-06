import './Contact.css';
import instagramIcon from '../assets/instagram.png';
import linkedinIcon from '../assets/linkedin.png';
import githubIcon from '../assets/github.png';
import emailIcon from '../assets/email.svg';
import profileData from '../data/profile.json';

function Contact() {
    const { githubUrl, linkedinUrl, instagramUrl, username, email } = profileData.contact;

    return (
        <div id='Contact' className="Contact bg-image">
            <div className="content">
                <h1>CONTACT</h1>
                <div className='container'>
                    <div className="social">
                        <div className="icons">
                            <a href={githubUrl}>
                                <img src={githubIcon} alt="GitHub" />
                            </a>
                            <a href={linkedinUrl}>
                                <img src={linkedinIcon} alt="LinkedIn" />
                            </a>
                            {/* Temporary desactived */}
                            {/* <a href={instagramUrl}>
                                <img src={instagramIcon} alt="Instagram" />
                            </a> */}
                        </div>
                        <div className="text-group">
                            <h2>{username}</h2>
                        </div>
                    </div>
                    <div className="email">
                        <a className='icons' href={`mailto:${email}`}>
                            <img src={emailIcon} alt="Email" />
                        </a>
                        <div className="text-group">
                            <h2>{email}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
