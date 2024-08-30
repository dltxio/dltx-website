import { Link } from "react-router-dom";
import classnames from "classnames";
import LogoSvg from "../assets/logo.svg";

const Header: React.FC = () => {
    const MenuItem: React.FC<{ title: string, index: number }> = ({ title, index }) => {
        const to = "/" + title.toLowerCase();
        const isActiveRoute = window.location.pathname.endsWith(to);

        return (<>
            <div className={`row-start-1 col-start-${index} flex items-center px-2`}>
                <Link className={classnames({ "text-white": !!isActiveRoute }, { "text-[#77878]": !isActiveRoute })} to={to}>{title}</Link>
            </div>
            <div className={classnames(`row-start-2 col-start-${index}`, { "border-b-2 border-[#E6FF02]": !!isActiveRoute })}></div>
        </>);
    }

    return (<div className="grid-menu text-2xs">
        <div className="row-start-1 col-start-1 flex items-center">
            <img src={LogoSvg}></img>
            <div className="pl-2">Engineered to meet the needs of the corporate sector</div>
        </div>
        <div className="row-start-2 col-start-1"></div>
        <div className="row-start-1 col-start-2"></div>
        <div className="row-start-2 col-start-2"></div>
        <MenuItem title="Capability" index={3} />
        <MenuItem title="Manifesto" index={4} />
        <MenuItem title="Insights" index={5} />
        <button className="row-start-1 col-start-6 bg-[#E6FF02] text-black py-1 ml-2">Contact</button>
        <div className="row-start-2 col-start-6"></div>
    </div>);
}

export default Header;