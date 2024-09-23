import React from "react";
import classnames from "classnames";

const TAB_KEY = 9;

type DropdownProps = {
    items: string[];
    initial?: string;
    onClick: (item: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, initial, onClick }) => {
    const [selected, setSelected] = React.useState(initial || items[0]);
    const [open, setOpen] = React.useState(false);

    const clicked = (item: string) => {
        setOpen(false);
        setSelected(item);
        onClick(item);
    }

    const lostKeyFocus = <T extends {}>({ which, shiftKey }: React.KeyboardEvent<T>, index: number) => {
        if ((which == TAB_KEY) && ((index == 0 && shiftKey) || (index == (items.length - 2) && !shiftKey)))
            setOpen(false);
    }

    // Can't use <select> here as notoriously difficult to style
    return (<div className="relative">
        <button className={classnames("bg-transparent", { "underline underline-offset-4 decoration-dltx-green": open })} onClick={() => setOpen(o => !o)}>{selected}</button>
        {open && (items.length > 1) && <ul className="absolute top-[1.1rem] -left-[5px] bg-black z-10" onMouseLeave={() => setOpen(false)}>
            {items.filter(item => item != selected).map((item, i) => (
                <li key={i} className="text-dltx-grey text-nowrap mx-[5px] my-[2px] hover:text-white">
                    <button className="bg-transparent font-normal text-start w-full" onClick={() => clicked(item)} onKeyDown={(e) => lostKeyFocus(e, i)}>{item}</button>
                </li>
            ))}
        </ul>}
    </div>);
};

export default Dropdown;