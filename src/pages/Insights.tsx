import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import classnames from "classnames";
import { useSettingsProvider } from "../providers/Settings";
import useBreakpoint from "../hooks/useBreakpoint";
import { useInsights, InsightSortType } from "../hooks/useInsights";
import { InsightBrief } from "../types/insights";
import PageLayout from "../components/PageLayout";
import Section from "../components/Section";
import Dropdown from "../components/Dropdown";
import InsightCard from "../components/InsightCard";

const INSIGHTS_PER_PAGE = 9;

const Insights: React.FC = () => {
  const { sortType, categoryFilter, setSortType, setCategoryFilter } = useSettingsProvider();
  const [insights, categories] = useInsights(sortType, categoryFilter);
  const [paginatedInsights, setPaginatedInsights] = useState<InsightBrief[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, _] = useSearchParams();
  const { isLg } = useBreakpoint();

  // !! Fix dropdown keyboard focus
  // !! Remove link color for anchor
  // !! Font

  const page = parseInt(searchParams.get("page") ?? "") || 1;

  useEffect(() => {
    setTotalPages(isLg ? insights.length / INSIGHTS_PER_PAGE + 1 : 0);
    setPaginatedInsights(isLg ? insights.slice(INSIGHTS_PER_PAGE * (page - 1), INSIGHTS_PER_PAGE * page) : insights);
  }, [insights, isLg]);

  return (
    <PageLayout>
      <Section title="INSIGHTS">
        The latest trends and expert analysis in decentralised technologies. Stay ahead with in-depth content on blockchain, digital assets, and the future of the internet.
      </Section>

      {insights && <div className="flex flex-col">
        <div className="flex justify-between text-xs py-2">
          <div className="flex">
            <span className="pr-1">Sort by:</span>
            <Dropdown items={Object.values(InsightSortType)} initial={sortType} onClick={(item => setSortType(item as InsightSortType))} />
          </div>
          <div className="flex flex-wrap-reverse justify-end max-w-[50%]">
            {categories && categories.map(c => <div
              className={classnames("pl-3 cursor-pointer", { "underline underline-offset-4 decoration-[#E6FF02]": c == categoryFilter })}
              onClick={() => setCategoryFilter(c)}>{c}</div>)}
          </div>
        </div>
        <div className="grid-card gap-6 py-4">
          {paginatedInsights.map((insight, i) => <InsightCard key={i} {...insight} showImage={true} />)}
        </div>
        {(totalPages > 0) && <div className="flex justify-center pb-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(i => {
            const to = `/insights` + ((i == 1) ? `` : `?page=${i}`);
            return (<Link className={classnames("page-marker", { "text-white border-white": page == i })} to={to}>{i}</Link>)
          })}
        </div>}
      </div>}
    </PageLayout>
  );
};

export default Insights;