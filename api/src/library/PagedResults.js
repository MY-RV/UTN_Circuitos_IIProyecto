exports.PagedResults = class {
  totalPages = 0;
  totalItems = 0;
  data = [];

  constructor(rows = [], { page = 1, size = 10 }) {
    const start = (page - 1) * size;
    const final = Number(start) + Number(size);

    this.data = rows.filter((_, index) => index >= start && index < final);
    this.totalPages = Math.ceil(rows.length / size);
    this.totalItems = rows.length;
  }
};
