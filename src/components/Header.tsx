import React from "react";
import { Link } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import classnames from "classnames";
import useBreakpoint from "../hooks/useBreakpoint";
import LogoSvg from "../assets/logo.svg";

type MenuProps = {
    title: string;
    index?: number;
    to: string;
    isActiveRoute: boolean;
}

const MenuItemBase: React.FC<{ template: React.FC<MenuProps>, title: string, index?: number }> = ({ template, title, index }) => {
    const to = "/" + title.toLowerCase();
    const isActiveRoute = window.location.pathname.includes(to);

    return React.createElement(template, { title, index, to, isActiveRoute });
};

const HeaderMobile: React.FC = () => {
    const MenuItemNormal: React.FC<MenuProps> = ({ title, to, isActiveRoute }) => <MenuItem>
        <div className={classnames("text-xs bg-black border-solid border-dltx-grey border [&:not(:last-child)]:border-b-0 px-3 py-1 hover:text-dltx-green",
            { "text-white border-l-dltx-green border-l-4": isActiveRoute },
            { "text-dltx-grey": !isActiveRoute })}>
            <Link to={to}>{title}</Link>
        </div>
    </MenuItem>;

    const MenuItemHighlight: React.FC<MenuProps> = ({ title, to }) => <MenuItem>
        <div className={classnames("text-xs bg-dltx-green border-solid border-dltx-grey border px-3 py-1 hover:bg-white")}>
            <Link className={"text-black"} to={to}>{title}</Link>
        </div>
    </MenuItem>;

    return (<div className="flex justify-between pb-4">
        <Link to="/">
            <img src={LogoSvg}></img>
        </Link>
        <Menu>
            <MenuButton as="div">
                <CgMenuRightAlt size={30} color="white" />
            </MenuButton>
            <MenuItems transition
                anchor={{ to: 'bottom end', gap: '1rem' }}
                className="transition origin-top-right duration-300 ease-in data-[closed]:scale-80 data-[closed]:opacity-0 outline-none">
                <MenuItemBase title="Capability" template={MenuItemNormal}></MenuItemBase>
                <MenuItemBase title="Manifesto" template={MenuItemNormal}></MenuItemBase>
                <MenuItemBase title="Insights" template={MenuItemNormal}></MenuItemBase>
                <MenuItemBase title="Contact" template={MenuItemHighlight}></MenuItemBase>
            </MenuItems>
        </Menu>
    </div>);
}

const HeaderDesktop: React.FC = () => {
    const MenuItemNormal: React.FC<MenuProps> = ({ title, index, to, isActiveRoute }) => <>
        <div className={classnames(`row-start-1 col-start-${index} flex items-center px-2 hover:text-dltx-green`,
            { "text-white": isActiveRoute },
            { "text-dltx-grey": !isActiveRoute })}>
            <Link to={to}>{title}</Link>
        </div>
        <div className={classnames(`row-start-2 col-start-${index}`, { "border-b-2 border-dltx-green": isActiveRoute })}></div>
    </>;

    const MenuItemHighlight: React.FC<MenuProps> = ({ title, index, to }) => <>
        <div className={`row-start-1 col-start-${index} base-button py-1 px-3 ml-2`}>
            <Link className={"text-black"} to={to}>{title}</Link>
        </div>
    </>;

    return (<div className="grid-menu text-2xs">
        <div className="row-start-1 col-start-1 flex items-center">
            <Link to="/">
                <img src={LogoSvg}></img>
            </Link>
            <div className="pl-2">Engineered to meet the needs of the corporate sector</div>
        </div>
        <div className="row-start-2 col-start-1"></div>
        <div className="row-start-1 col-start-2"></div>
        <div className="row-start-2 col-start-2"></div>
        <MenuItemBase title="Capability" index={3} template={MenuItemNormal} />
        <MenuItemBase title="Manifesto" index={4} template={MenuItemNormal} />
        <MenuItemBase title="Insights" index={5} template={MenuItemNormal} />
        <MenuItemBase title="Contact" index={6} template={MenuItemHighlight} />
        <div className="row-start-2 col-start-6"></div>
    </div>);
}

const Header: React.FC = () => {
    const { isLg } = useBreakpoint();
    return isLg ? <HeaderDesktop /> : <HeaderMobile />;
}

export default Header;