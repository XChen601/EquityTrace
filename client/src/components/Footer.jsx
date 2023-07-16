import {AiFillGithub, AiFillLinkedin} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer">
      <div class="footer-section">
        <a href="/"><AiFillGithub /></a>
        <a href="/"><AiFillLinkedin /></a>
      </div>
      <div className="copyright">
        <p>© 2023 StockTrace. All rights reserved.</p>
      </div>
      
    </div>
  );
};

export default Footer;
