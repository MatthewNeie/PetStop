import './footer.css'
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer2 = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <h2 className="footer-logo">
            PETSTOP LOGO
        </h2>
        <p className="footer-description">
            PetStop is your all stop pet shop. We provide food, toys, and accessories for your pets.
            We strive to fulfill your pet needs with high quality products and timely deliveries.
            If you are interested in becoming a member, sign up!
        </p>
        <div className="footer-socialmedia">
            <div className="footer-socialicon-facebook">
                <a href="https://facebook.com/" className="footer-facebookicon"><FacebookIcon></FacebookIcon></a>
            </div>
            <div className="footer-socialicon-instagram">
                <a href="https://www.instagram.com/" className="footer-instagramicon"><InstagramIcon></InstagramIcon></a>
            </div>
            <div className="footer-socialicon-twitter">
                <a href="https://www.twitter.com/" className="footer-twittericon"><TwitterIcon></TwitterIcon></a>
            </div>
        </div>
      </div>
      <div className="footer-center">
        <h3 className="footer-center-title">Useful Links</h3>
        <ul className="footer-list">
            <li className="footer-listitem"><Link className="hyperlink">Home</Link></li>
            <li className="footer-listitem"><Link className="hyperlink">Cart</Link></li>
            <li className="footer-listitem"><Link className="hyperlink">Pet Food</Link></li>
            <li className="footer-listitem"><Link className="hyperlink">Pet Toys</Link></li>
            <li className="footer-listitem"><Link className="hyperlink">Pet Accessories</Link></li>
            <li className="footer-listitem"><Link className="hyperlink">Pet Services</Link></li>
            <li className="footer-listitem"><Link className="hyperlink">My Account</Link></li>
            <li className="footer-listitem"><Link className="hyperlink">Order Tracking</Link></li>
            <li className="footer-listitem"><Link className="hyperlink">Settings</Link></li>
            <li className="footer-listitem"><Link className="hyperlink">Terms of Servie</Link></li>
        </ul>
      </div>
      <div className="footer-right">
        <h3 className="footer-right-title">Contact Us</h3>
            <div className="footer-right-contact">
                <div className="footer-contact-address"><LocationOnIcon/>316 Traffic Way, Los Angeles, 90001</div>
            </div>
            <div className="footer-right-contact">
                <div className="footer-contact-phonenumber"><PhoneIcon/>+1 458 612 0964</div>
            </div>
            <div className="footer-right-contact">
                <div className="footer-contact-email"><EmailIcon/>PetStopContact@gmail.com</div>
            </div>
      </div>
    </div>
  )
}

export default Footer2