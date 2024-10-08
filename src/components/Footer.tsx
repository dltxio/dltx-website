import classnames from "classnames";
import useBreakpoint from "../hooks/useBreakpoint";
import { BOOKING_URL } from "../constants/env";
import LogoSvg from "../assets/logo.svg";
import DoorImg from "../assets/door.jpg";
import DoorOpenImg from "../assets/door-open.jpg";

const Footer: React.FC = () => {
    const { isLg, isXl } = useBreakpoint();

    const bookConsultClicked = () => {
        // robots can still crawl javascript links so we don't lose SEO
        window.open(BOOKING_URL, "_blank", "noopener noreferrer");
    }

    return (<div className="pt-4 items-center">
        <div className="relative">
            <div className="lg:hidden">
                <img src={DoorImg}></img>
                <div className="absolute w-full h-full top-0 left-0">
                    <div className="flex h-full justify-center items-center">
                        <button className="base-button text-xs mx-auto p-2" onClick={bookConsultClicked}>Book a consultation</button>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <img src={DoorOpenImg}></img>
                <div className="absolute w-full top-[53%] left-0">
                    <div className="flex">
                        <button className="base-button text-xs mx-auto px-3 py-2" onClick={bookConsultClicked}>Book a consultation</button>
                    </div>
                </div>
            </div>
        </div>
        <div className={classnames("flex items-start justify-between pt-4 gap-y-4 text-2xs", { "flex-col ": !isLg })}>
            <img src={LogoSvg}></img>
            <div className={classnames("flex flex-wrap", { "flex-col": !isXl })}>
                <div>BLOCKCHAIN&nbsp;TECHNOLOGY/</div>
                <div>DEFI/</div>
                <div>ERC721&nbsp;NFT&nbsp;CONTRACTS/</div>
                <div>ERC20&nbsp;SMART&nbsp;CONTRACTS</div>
            </div>
            <div className="text-dltx-grey">2024 &#169; DLTx Labs</div>
        </div>
    </div>);
}

export default Footer;