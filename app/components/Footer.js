import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-orange-600 text-white py-4 px-5">
      <div className="flex justify-center items-center space-x-5">
       
        <a
          href="https://github.com/sntanju"
          target="_blank"
          rel="noopener noreferrer"> <FaGithub size={20} /> </a>
        
        
        <a
          href="https://www.linkedin.com/in/sntanju07"
          target="_blank"
          rel="noopener noreferrer" > <FaLinkedin size={20} /> </a>

        
        <a
          href="https://github.com/sntanju/Top-News"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:font-semibold transition" >  Source Code </a>

      </div>
    </footer>
  );
};

export default Footer;
