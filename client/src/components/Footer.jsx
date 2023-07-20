import {AiFillGithub, AiFillLinkedin} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer">
      <div class="footer-section">
        <a href="https://github.com/XChen601" target="_blank"><AiFillGithub /></a>
        <a href="https://www.linkedin.com/in/xchen601/" target="_blank"><AiFillLinkedin /></a>
      </div>
      <div className="copyright">
        <p>© 2023 EquityTrace. All rights reserved.</p>
      </div>
      
    </div>
  );
};

export default Footer;
