import './footer.css'
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
        <h1 className="footer-logo">
            PETSTOP LOGO
        </h1>
        <p className="footer-description">
            PetStop is your all stop pet shop. We provide food, toys, and accessories for your pets.
            We strive to fulfill your pet needs with high quality products and timely deliveries.
            If you are interested in becoming a member, sign up!
        </p>
        <div className="footer-socialmedia">
            <div className="footer-socialicon-facebook">
                <div className="footer-facebookicon"><FacebookIcon></FacebookIcon></div>
            </div>
            <div className="footer-socialicon-instagram">
                <div className="footer-instagramicon"><InstagramIcon></InstagramIcon></div>
            </div>
            <div className="footer-socialicon-twitter">
                <div className="footer-twittericon"><TwitterIcon></TwitterIcon></div>
            </div>
        </div>
      </div>
      <div className="footer-center">
        <h3 className="footer-center-title">Useful Links</h3>
        <ul className="footer-list">
            <li className="footer-listitem">Home</li>
            <li className="footer-listitem">Cart</li>
            <li className="footer-listitem">Pet Food</li>
            <li className="footer-listitem">Pet Toys</li>
            <li className="footer-listitem">Pet Accessories</li>
            <li className="footer-listitem">Pet Services</li>
            <li className="footer-listitem">My Account</li>
            <li className="footer-listitem">Order Tracking</li>
            <li className="footer-listitem">Wishlist</li>
            <li className="footer-listitem">Terms of Servie</li>
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