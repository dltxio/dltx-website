import { useEffect, useState } from "react";
import axios from "axios";
import { InsightsResponse, InsightShort } from "../types/insights";

const STRAPI_URL = "http://10.5.20.52:1337/api"
const STRAPI_API_TOKEN = "539df41bf60b7b7e2546945300657057a1253115c8e9d79395464c6d6c6afa5cba108a1753345adfdfcd4011ccb21bd96c165a9a99e23b069c9c01d6e53bd594778a9f7317df9cd4524b272cfd9b9504f25bdfb5f389c905a9a711b1ef6c44908d8f476035448b4b7824838dd4b0d9448163234bd830b3bfde05e7546d340196";

export function useInsights(): [InsightShort[], string[]] {
    const [blogs, setBlogs] = useState<InsightShort[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        axios.get<InsightsResponse>(
            `${STRAPI_URL}/blogs?fields[0]=slug&fields[1]=category&fields[2]=title&fields[3]=abstract&fields[4]=publishedAt&populate=picture`,
            { headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` } }
        ).then(({ data }) => {
            setCategories([...new Set(data.data.map(b => b.attributes.category))]);
            setBlogs(data.data);
        }).catch(err => console.error(err));
    }, []);

    return [blogs, categories];
}

export default useInsights;