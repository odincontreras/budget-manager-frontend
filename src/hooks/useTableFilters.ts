import React from "react";
import type { TablePaginationConfig } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import { TablesSorter } from "@/types";

type FiltersState = {
  filters: Record<string, unknown>;
  orderBy?: Record<string, unknown>;
};

const useTableFilters = ({
  initialFilters = { filters: {}, orderBy: undefined },
}) => {
  const [filters, setFilters] = React.useState<FiltersState>(initialFilters);

  const onSetFilters = (filters: FiltersState) => {
    setFilters(filters);
  };

  const handleTableChange = (
    _: TablePaginationConfig,
    tableFilters: Record<string, FilterValue | null>,
    sorter: TablesSorter
  ) => {
    const validFilters: Record<string, unknown> = { ...filters.filters };
    let orderBy = filters?.orderBy;

    if (!Array.isArray(sorter) && sorter.order) {
      orderBy = {
        [sorter.field as string]: sorter.order === "ascend" ? "asc" : "desc",
      };
    }

    if (!Array.isArray(sorter) && orderBy && !sorter.order) {
      orderBy = undefined;
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

    onSetFilters({ filters: validFilters, orderBy });
  };

  return {
    filters,
    handleTableChange,
  };
};

export default useTableFilters;
