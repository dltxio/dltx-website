import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { motion } from "framer-motion";
import { InsightBrief } from "../types/insights";

const InsightCard: React.FC<InsightBrief & { showImage?: boolean }> = (insight) => {
    return (insight && <Link to={`/insights/${insight.attributes?.slug}`}>
        <motion.div className={classnames("w-full bg-gradient-to-r from-transparent to-[#202020] rounded-xl overflow-hidden hover:text-white", { "lg:aspect-[4/3]": !insight.showImage }, { "lg:aspect-[3/4]": insight.showImage })}
            whileHover={{ scale: 1.03 }}
            transition={{ ease: "easeIn", duration: 0.3 }}>
            {insight.showImage && <img className="h-1/2 w-full object-cover" src={`${insight.pictureAbsoluteUrl}`}></img>}
            <div className={classnames("flex flex-col px-4", { "h-full": !insight.showImage }, { "h-1/2": insight.showImage })}>
                <div className="flex-initial text-2xs font-semibold w-fit mt-4 mb-2 border border-white border-solid rounded-xl px-2 py-[2px]">{insight.attributes?.category}</div>
                <div className="flex-initial text-sm font-semibold mb-2">{insight.attributes?.title}</div>
                <div className="flex-auto min-h-0 text-2xs overflow-hidden mb-1">{insight.attributes?.abstract}</div>
                <div className="flex-initial text-2xs font-bold mb-4">Read more</div>
            </div>
        </motion.div>
    </Link>);
}

export default InsightCard;