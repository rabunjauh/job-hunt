"use client";

import { FC, useMemo } from "react";

import useSWR from "swr";

import TitleSection from "@/components/atoms/TitleSection";
import { BiCategory } from "react-icons/bi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import CategoryItem from "./Categoryitem";
import { fetcher, parsingCategories } from "@/lib/utils";
import { categoryJobType } from "@/types";
// import { categoryJobType } from "@/types";

interface CategoryProps {}

const Category: FC<CategoryProps> = ({}) => {
  const { data, isLoading, error } = useSWR("/api/jobs/categories", fetcher);

  const categories = useMemo(
    () => parsingCategories(data, isLoading, error),
    [data, isLoading, error]
  );

  return (
    <div className="mt-32 mb-8">
      <TitleSection word1="Explore by" word2="category" />
      <div className="grid grid-cols-5 gap-9 mt-12">
        {/* {categories.map((item: categoryJobType) => ( */}
        {categories.map((item: categoryJobType) => (
          <CategoryItem
            key={item.id}
            name={item.name}
            totalJobs={item.totalJobs}
          />
          // <div
          //   key={item}
          //   className="border border-border p-8 cursor-pointer transition-colors group hover:border-primary hover:bg-primary hover:text-white"
          // >
          //   <BiCategory className="w-12 h-12 text-primary group-hover:text-white" />
          //   <div className="mt-7">
          //     <div className="text-2xl font-semibold">Category</div>
          //     <div className="text-muted-foreground inline-flex items-center gap-1 mt-1 group-hover:text-white">
          //       <span>100 jobs available</span>
          //       <HiOutlineArrowNarrowRight className="hover:text-white" />
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
