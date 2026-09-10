import './Contact.css';
import linkedinIcon from '../assets/linkedin.png';
import githubIcon from '../assets/github.webp';
import emailIcon from '../assets/email.svg';
import { useLang } from '../lang';

function Contact() {
    const { t } = useLang();
    const { githubUrl, linkedinUrl, username, email } = t.contact;

    return (
        <div id='Contact' className="Contact bg-image">
            <div className="content">
                <h1>{t.ui.contact.heading}</h1>
                <div className='container'>
                    <div className="social">
                        <div className="icons">
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                <img src={githubIcon} alt="GitHub" />
                            </a>
                            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                                <img src={linkedinIcon} alt="LinkedIn" />
                            </a>
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
