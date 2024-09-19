import classnames from "classnames";
import useBreakpoint from "../hooks/useBreakpoint";
import LogoSvg from "../assets/logo.svg";
import DoorImg from "../assets/door.png";
import DoorOpenImg from "../assets/door-open.png";

const Footer: React.FC = () => {
    const { isLg, isXl } = useBreakpoint();

    return (<div className="pt-4 items-center">
        <div className="relative">
            <div className="lg:hidden">
                <img src={DoorImg}></img>
                <div className="absolute w-full h-full top-0 left-0">
                    <div className="flex h-full justify-center items-center">
                        <button className="bg-[#E6FF02] text-black text-xs rounded-sm mx-auto p-2">Book a consultation</button>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <img src={DoorOpenImg}></img>
                <div className="absolute w-full top-[53%] left-0">
                    <div className="flex">
                        <button className="bg-[#E6FF02] text-black text-xs rounded-sm mx-auto px-3 py-2">Book a consultation</button>
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
            <div className="text-[#787878]">2024 &#169; DLTx Labs</div>
        </div>
    </div>);
}

export default Footer;