"use client";

import { CATEGORIES_OPTIONS } from "@/constants";
import ExploreDataContainer from "@/containers/ExploreDataContainer";
import useCategoryCompanyFilter from "@/hooks/useCategoryCompanyFilter";
import useCompanies from "@/hooks/useCompanies";
import { formFilterCompanySchema } from "@/lib/form-schema";
import { CompanyType, filterFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FindCompaniesPageProps {}

const FILTER_FORMS: filterFormType[] = [
  {
    name: "industry",
    label: "Industry",
    items: CATEGORIES_OPTIONS,
  },
];

// const dataDummy: CompanyType[] = [
//   {
//     image: "/images/company2.png",
//     categories: "Marketing",
//     description: "Lorem",
//     name: "Twitter",
//     totalJobs: 10,
//   },
//   {
//     image: "/images/company2.png",
//     categories: "Marketing",
//     description: "Lorem",
//     name: "Twitter",
//     totalJobs: 10,
//   },
//   {
//     image: "/images/company2.png",
//     categories: "Marketing",
//     description: "Lorem",
//     name: "Twitter",
//     totalJobs: 10,
//   },
// ];

const FindCompaniesPage: FC<FindCompaniesPageProps> = ({}) => {
  const formFilter = useForm<z.infer<typeof formFilterCompanySchema>>({
    resolver: zodResolver(formFilterCompanySchema),
    defaultValues: {
      industry: [],
    },
  });

  const { filters } = useCategoryCompanyFilter();

  const [categories, setCategories] = useState<string[]>([]);

  const { companies, isLoading, mutate } = useCompanies(categories);

  const onSubmit = async (val: z.infer<typeof formFilterCompanySchema>) => {
    setCategories(val.industry);
  };

  useEffect(() => {
    mutate();
  }, [categories]);

  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={onSubmit}
      filterForms={filters}
      title="dream companies"
      subtitle="Find the dream companies you dream work for"
      loading={isLoading}
      type="company"
      data={companies}
    />
  );
};

export default FindCompaniesPage;
