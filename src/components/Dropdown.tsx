import React from "react";
import classnames from "classnames";

type DropdownProps = {
    items: string[];
    onClick: (item: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, onClick }) => {
    const [selected, setSelected] = React.useState(items[0]);
    const [open, setOpen] = React.useState(false);

    const clicked = (item: string) => {
        setOpen(false);
        setSelected(item);
        onClick(item);
    }

    return (<div className="relative">
        <button className={classnames("bg-transparent", { "underline underline-offset-4 decoration-[#E6FF02]": open })} onClick={() => setOpen(o => !o)}>{selected}</button>
        {open && <ul className="absolute top-[1.1rem] -left-[5px] bg-black z-10" onMouseLeave={() => setOpen(false)}>
            {items.filter(item => item != selected).map((item, index) => (
                <li key={index} className="text-[#818181] text-nowrap  mx-[5px] my-[2px] hover:text-white">
                    <button className="bg-transparent font-normal" onClick={() => clicked(item)}>{item}</button>
                </li>
            ))}
        </ul>}
    </div>);
};

export default Dropdown;