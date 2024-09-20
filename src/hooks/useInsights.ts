import { useEffect, useState } from "react";
import axios from "axios";
import { InsightBrief, InsightFull } from "../types/insights";

// !! import from env
const STRAPI_URL = "http://10.5.20.52:1337"
const STRAPI_API_TOKEN = "539df41bf60b7b7e2546945300657057a1253115c8e9d79395464c6d6c6afa5cba108a1753345adfdfcd4011ccb21bd96c165a9a99e23b069c9c01d6e53bd594778a9f7317df9cd4524b272cfd9b9504f25bdfb5f389c905a9a711b1ef6c44908d8f476035448b4b7824838dd4b0d9448163234bd830b3bfde05e7546d340196";

export const ShowAll = "Show All";

export enum InsightSortType {
    DateListed = "Date Listed",
    Category = "Category",
    Title = "Title",
}

export function useInsight(slug?: string): InsightFull | undefined {
    const [insight, setInsight] = useState<InsightFull>();

    useEffect(() => {
        if (slug) {
            axios.get<{ data: Omit<InsightFull, "pictureAbsoluteUrl">[] }>(
                `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=picture`,
                { headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` } }
            ).then(({ data }) => {
                if (data.data.length != 1)
                    throw new Error("Insight not uniquely found");
                setInsight({...data.data[0], pictureAbsoluteUrl: `${STRAPI_URL}${data.data[0].attributes.picture.data.attributes.url}`});
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
        axios.get<{ data: Omit<InsightBrief, "pictureAbsoluteUrl">[] }>(
            `${STRAPI_URL}/api/blogs?fields[0]=slug&fields[1]=category&fields[2]=title&fields[3]=abstract&fields[4]=publishedAt&populate=picture`,
            { headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` } }
        ).then(({ data }) => {
            setCategories([...new Set(data.data.map(b => b.attributes.category)), ShowAll]);
            setAllInsights(data.data.map(x => ({...x, pictureAbsoluteUrl: `${STRAPI_URL}${x.attributes.picture.data.attributes.url}`})));
        }).catch(err => console.error(err));
    }, []);

    useEffect(() => {
        setInsights(allInsights.filter(b => (categoryFilter == ShowAll) || (b.attributes.category == categoryFilter)).sort(sortPredicate));
    }, [allInsights, sortType, categoryFilter]);

    return [insights, categories];
}
