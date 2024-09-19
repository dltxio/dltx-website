import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import { motion } from "framer-motion";
import useBreakpoint from "../hooks/useBreakpoint";
import { BlogsResponse, BlogShort } from "../types/insights";
import PageLayout from "../components/PageLayout";
import Section from "../components/Section";

const INSIGHTS_PER_PAGE = 9;
const STRAPI_URL = "http://localhost:1337/api"
const STRAPI_API_TOKEN = "539df41bf60b7b7e2546945300657057a1253115c8e9d79395464c6d6c6afa5cba108a1753345adfdfcd4011ccb21bd96c165a9a99e23b069c9c01d6e53bd594778a9f7317df9cd4524b272cfd9b9504f25bdfb5f389c905a9a711b1ef6c44908d8f476035448b4b7824838dd4b0d9448163234bd830b3bfde05e7546d340196";

const Card: React.FC<BlogShort> = (blog) => {
  return (<a key={blog.attributes.slug} href={`/insights/${blog.attributes.slug}`}>
    <motion.div className="flex flex-col bg-gradient-to-r from-transparent to-[#202020] rounded-xl hover:text-white mx-1"
      whileHover={{ scale: 1.03 }}
      transition={{ ease: "easeIn", duration: 0.3 }}>
      <img src={`http://localhost:1337${blog.attributes.picture.data.attributes.url}`}></img>
      <div className="p-6">
        <div className="text-2xs font-semibold w-fit mb-4 border border-white border-solid rounded-xl px-2 py-1">{blog.attributes.category}</div>
        <div className="text-sm font-semibold mb-4">{blog.attributes.title}</div>
        <div className="text-2xs mb-4">{blog.attributes.abstract}</div>
        <div className="text-2xs font-bold">Read more</div>
      </div>
    </motion.div>
  </a>);
}

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
    {open && <ul className="absolute top-[1.1rem] -left-[5px] bg-black z-10" onPointerLeave={() => setOpen(false)}>
      {items.filter(item => item != selected).map((item, index) => (
        <li key={index} className="text-[#818181] text-nowrap  mx-[5px] my-[2px] hover:text-white">
          <button className="bg-transparent font-normal" onClick={() => clicked(item)}>{item}</button>
        </li>
      ))}
    </ul>}
  </div>);
};

const ShowAll = "Show All";

enum SortType {
  DateListed = "Date Listed",
  Category = "Category",
  Title = "Title",
}

const Insights: React.FC = () => {
  const [allBlogs, setAllBlogs] = useState<BlogShort[]>([]);
  const [blogs, setBlogs] = useState<BlogShort[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>(ShowAll);
  const [sortType, setSortType] = useState<SortType>(SortType.DateListed);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, _] = useSearchParams();
  const { isLg } = useBreakpoint();

  const page = parseInt(searchParams.get("page") ?? "") || 1;

  const sortPredicate = (a: BlogShort, b: BlogShort): number => {
    let result = 0;
    if (sortType == SortType.Category)
      result = a.attributes.category.localeCompare(b.attributes.category);
    else if (sortType == SortType.Title)
      result = a.attributes.title.localeCompare(b.attributes.title);
    return result || (a.attributes.publishedAt > b.attributes.publishedAt ? 1 : -1);
  }

  useEffect(() => {
    axios.get<BlogsResponse>(
      `${STRAPI_URL}/blogs?fields[0]=slug&fields[1]=category&fields[2]=title&fields[3]=abstract&fields[4]=publishedAt&populate=picture`,
      { headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` } }
    ).then(({ data }) => {
      setCategories([...new Set(data.data.map(b => b.attributes.category)), ShowAll]);
      setAllBlogs(data.data);
    }).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const filtered = allBlogs.filter(b => (categoryFilter == ShowAll) || (b.attributes.category == categoryFilter)).sort(sortPredicate);
    setTotalPages(isLg ? filtered.length / INSIGHTS_PER_PAGE + 1 : 0);
    setBlogs(isLg ? filtered.slice(INSIGHTS_PER_PAGE * (page - 1), INSIGHTS_PER_PAGE * page) : filtered);
  }, [allBlogs, isLg, categoryFilter, sortType]);

  return (
    <PageLayout>
      <Section title="INSIGHTS">
        The latest trends and expert analysis in decentralised technologies. Stay ahead with in-depth content on blockchain, digital assets, and the future of the internet.
      </Section>

      {blogs && <div className="flex flex-col">
        <div className="flex justify-between text-xs py-2">
          <div className="flex">
            <span className="pr-1">Sort by:</span>
            <Dropdown items={Object.values(SortType)} onClick={(item => setSortType(item as SortType))} />
          </div>
          <div className="flex">
            {categories && categories.map(c => <span
              className={classnames("pl-3 cursor-pointer", { "underline underline-offset-4 decoration-[#E6FF02]": c == categoryFilter })}
              onClick={() => setCategoryFilter(c)}>{c}</span>)}
          </div>
        </div>
        <div className="grid-card gap-6 py-4">
          {blogs.map((blog) => <Card {...blog} />)}
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