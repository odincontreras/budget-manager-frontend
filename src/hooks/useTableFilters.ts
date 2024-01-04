import React from "react";
import type { TablePaginationConfig } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import {
  ExpensesAndIncomesFilters,
  Income,
  QueryParams,
  TablesSorter,
} from "@/types";

const useTableFilters = ({
  initialFilters = { filters: {}, orderBy: undefined, take: 5, skip: 0 },
}) => {
  const [filters, setFilters] =
    React.useState<QueryParams<Income, ExpensesAndIncomesFilters>>(
      initialFilters
    );
  const pageSize = React.useRef(initialFilters.take);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    tableFilters: Record<string, FilterValue | null>,
    sorter: TablesSorter
  ) => {
    const validFilters: Record<string, unknown> = { ...filters.filters };
    let orderBy = filters?.orderBy;
    let skip = filters?.skip || 0;
    let take = filters?.take;

    if (!Array.isArray(sorter) && sorter.order) {
      orderBy = {
        [sorter.field as string]: sorter.order === "ascend" ? "asc" : "desc",
      };
    }

    if (!Array.isArray(sorter) && orderBy && !sorter.order) {
      orderBy = undefined;
    }

    if (pagination.current && pagination.current -1 !== skip) {
      skip = pagination.current - 1;

      if (
        pagination?.total &&
        pagination?.pageSize &&
        pagination.total < pagination.current * pagination.pageSize
      ) {
        take = pagination.total - pagination.pageSize;
      } else {
        take = pageSize.current;
      }

      skip = pagination.current - 1;
    }

    for (const [key, value] of Object.entries(tableFilters)) {
      if (key === "date" && value) {
        validFilters[key] = {
          gte: value[0],
          lte: value[1],
        };
        continue;
      }

      if (value && Array.isArray(value) && value.length > 0) {
        validFilters[key] = {
          in: value,
        };
        continue;
      }

      if (value) {
        validFilters[key] = value;
        continue;
      }

      validFilters[key] = undefined;
    }

    setFilters({
      filters: validFilters,
      orderBy,
      take,
      skip,
    });
  };

  return {
    filters,
    pageSize: pageSize.current,
    handleTableChange,
  };
};

export default useTableFilters;
