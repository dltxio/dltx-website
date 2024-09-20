import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classnames from "classnames";
import useBreakpoint from "../hooks/useBreakpoint";
import useInsights from "../hooks/useInsights";
import { InsightShort } from "../types/insights";
import PageLayout from "../components/PageLayout";
import Section from "../components/Section";
import Dropdown from "../components/Dropdown";
import InsightCard from "../components/InsightCard";

const INSIGHTS_PER_PAGE = 9;

const ShowAll = "Show All";

enum SortType {
  DateListed = "Date Listed",
  Category = "Category",
  Title = "Title",
}

const Insights: React.FC = () => {
  const [allInsights, categories] = useInsights();
  const [insights, setInsights] = useState<InsightShort[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>(ShowAll);
  const [sortType, setSortType] = useState<SortType>(SortType.DateListed);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, _] = useSearchParams();
  const { isLg } = useBreakpoint();

  // !! Need to remember filter/sort settings
  // !! Fix issue with scale effect and scrollbar

  const page = parseInt(searchParams.get("page") ?? "") || 1;

  const sortPredicate = (a: InsightShort, b: InsightShort): number => {
    let result = 0;
    if (sortType == SortType.Category)
      result = a.attributes.category.localeCompare(b.attributes.category);
    else if (sortType == SortType.Title)
      result = a.attributes.title.localeCompare(b.attributes.title);
    return result || (a.attributes.publishedAt > b.attributes.publishedAt ? 1 : -1);
  }

  useEffect(() => {
    const filtered = allInsights.filter(b => (categoryFilter == ShowAll) || (b.attributes.category == categoryFilter)).sort(sortPredicate);
    setTotalPages(isLg ? filtered.length / INSIGHTS_PER_PAGE + 1 : 0);
    setInsights(isLg ? filtered.slice(INSIGHTS_PER_PAGE * (page - 1), INSIGHTS_PER_PAGE * page) : filtered);
  }, [allInsights, isLg, categoryFilter, sortType]);

  return (
    <PageLayout>
      <Section title="INSIGHTS">
        The latest trends and expert analysis in decentralised technologies. Stay ahead with in-depth content on blockchain, digital assets, and the future of the internet.
      </Section>

      {insights && <div className="flex flex-col">
        <div className="flex justify-between text-xs py-2">
          <div className="flex">
            <span className="pr-1">Sort by:</span>
            <Dropdown items={Object.values(SortType)} onClick={(item => setSortType(item as SortType))} />
          </div>
          <div className="flex flex-wrap-reverse justify-end max-w-[50%]">
            {categories && categories.map(c => <div
              className={classnames("pl-3 cursor-pointer", { "underline underline-offset-4 decoration-[#E6FF02]": c == categoryFilter })}
              onClick={() => setCategoryFilter(c)}>{c}</div>)}
          </div>
        </div>
        <div className="grid-card gap-6 py-4">
          {insights.map((insight) => <InsightCard {...insight} showImage={true} />)}
        </div>
        {(totalPages > 0) && <div className="flex justify-center pb-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(i => {
            const href = `/insights` + ((i == 1) ? `` : `?page=${i}`);
            return (<a href={href} className={classnames("page-marker", { "text-white border-white": page == i })}>{i}</a>)
          })}
        </div>}
      </div>}
    </PageLayout>
  );
};

export default Insights;