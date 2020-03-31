interface ProjectionOption {
  includes?: string[],
  excludes?: string[],
}

interface PaginationOption {
  page?: number,
  perPage?: number,
}

interface Pagination {
  skip: number,
  limit: number,
}

interface SortOption {
  orderBy?: string,
  order?: "asc" | "desc",
}

export interface ViewOption extends ProjectionOption,PaginationOption,SortOption {}

export const buildProjection = (option: ProjectionOption = {}) => {
  let projections: any = {};
  // set fields to show
  for (let field of option.includes || []) {
    projections[field] = 1;
  }

  // set fields to hide
  for (let field of option.excludes || []) {
    projections[field] = 0;
  }

  return projections;
};

export const buildPagination = (option: PaginationOption = {}) => {
  let pagination = {} as Pagination;

  if (option.page) {

    pagination.limit = option.perPage || 10;
    pagination.skip = (option.page - 1) * pagination.limit;
    
  }

  return pagination;
};

export const buildSort = (option: SortOption = {}) => {
  let sort: any = {};

  if (option.orderBy) {
    switch (option.order) {
      case "desc":
        sort[option.orderBy] = -1;
        break;
      default:
        sort[option.orderBy] = 1;
        break;
    }
  }
  
  return sort;
};