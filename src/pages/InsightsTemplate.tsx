import React from "react";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useInsight } from "../hooks/useInsights";
import PageLayout from "../components/PageLayout";

const InsightsTemplate: React.FC = () => {
  const { slug } = useParams();
  const insight = useInsight(slug);

  return (
    <PageLayout>
      {insight && <img className="aspect-[3/2] md:aspect-[2] xl:aspect-[3] w-full object-cover py-6" src={insight.pictureAbsoluteUrl}></img>}

      {insight && <div className="flex flex-col lg:flex-row py-6">
        <div className="min-w-[20%]">
          <div className="text-2xs font-semibold w-fit border border-white border-solid rounded-xl px-2 py-1 mt-1 mb-4 mr-2">{insight.attributes?.category}</div>
        </div>
        <div className="grid-blog">
          <div className="text-2xl font-semibold pb-6">{insight.attributes?.title}</div>
          <div className="col-start-1 row-start-2 blog-paragraph">{insight.attributes?.abstract}</div>
          <div className="col-start-1 row-start-3 col-span-2 border-b border-[#818181] my-6"></div>
          {<div className="col-start-1 row-start-4 flex-col">
            {insight.attributes?.content.map((c, i) => <div key={i} className={classnames({ "blog-subheading": c.type == "heading" }, { "blog-paragraph": c.type == "paragraph" })}>{c.children[0].text}</div>)}
          </div>}
        </div>
      </div>}
    </PageLayout>
  );
};

export default InsightsTemplate;