import { useEffect, useState } from "react";
import axios from "axios";
import { STRAPI_API_TOKEN, STRAPI_URL } from "../constants/env";
import { InsightBrief, InsightFull } from "../types/insights";
import ExploreImg from "../assets/explore.jpg";

export const ShowAll = "Show All";

export enum InsightSortType {
    DateListed = "Date Listed",
    Category = "Category",
    Title = "Title",
}

function generateSrcPicture(insight: Omit<InsightBrief, "srcPicture">) {
    const relative = insight.attributes.picture?.data?.attributes?.url;
    return relative ? `${STRAPI_URL}${relative}` : ExploreImg; // provide fallback image
}

export function useInsight(slug?: string): InsightFull | undefined {
    const [insight, setInsight] = useState<InsightFull>();

    useEffect(() => {
        if (slug) {
            axios.get<{ data: Omit<InsightFull, "srcPicture">[] }>(
                `${STRAPI_URL}/api/insights?filters[slug][$eq]=${slug}&populate=picture`,
                { headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` } }
            ).then(({ data }) => {
                if (!data.data.length)
                    throw new Error("Insight not found");
                setInsight({...data.data[0], srcPicture: generateSrcPicture(data.data[0])});
            }).catch(err => console.error(err));
        }
        else
            setInsight(undefined);
    }, [slug]);

    return insight;
}

export function useInsights(sortType: InsightSortType = InsightSortType.DateListed, categoryFilter: string = ShowAll): [InsightBrief[], string[]] {
    const [allInsights, setAllInsights] = useState<InsightBrief[]>([]);
    const [insights, setInsights] = useState<InsightBrief[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const sortPredicate = (a: InsightBrief, b: InsightBrief): number => {
        let result = 0;
        if (sortType == InsightSortType.Category)
            result = a.attributes.category.localeCompare(b.attributes.category);
        else if (sortType == InsightSortType.Title)
            result = a.attributes.title.localeCompare(b.attributes.title);
        return result || (a.attributes.publishedAt > b.attributes.publishedAt ? 1 : -1);
    }

    useEffect(() => {
        // we only get the fields required to display the cards and NOT the contents, which means we can do simpler client-side filtering 
        // without incurring a large download cost; can always switch to server-side filtering once the number of insights justifies it 
        axios.get<{ data: Omit<InsightBrief, "srcPicture">[] }>(
            `${STRAPI_URL}/api/insights?fields[0]=slug&fields[1]=category&fields[2]=title&fields[3]=abstract&fields[4]=publishedAt&populate=picture`,
            { headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` } }
        ).then(({ data }) => {
            setCategories([...new Set(data.data.map(b => b.attributes.category)), ShowAll]);
            setAllInsights(data.data.map(x => ({...x, srcPicture: generateSrcPicture(x)})));
        }).catch(err => console.error(err));
    }, []);

    useEffect(() => {
        setInsights(allInsights.filter(b => (categoryFilter == ShowAll) || (b.attributes.category == categoryFilter)).sort(sortPredicate));
    }, [allInsights, sortType, categoryFilter]);

    return [insights, categories];
}
