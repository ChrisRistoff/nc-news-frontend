import {Link, useNavigate} from "react-router-dom";

export const Footer = () => {
  // eslint-disable-next-line no-undef
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(0);
  }
  return (
    <footer className="page-footer font-small blue pt-4">
      <div className="container">
        <div className="text-center py-3">© 2023 Copyright:
          <Link onClick={handleClick}>Recursion</Link>
        </div>
      </div>
    </footer>
  );
};
