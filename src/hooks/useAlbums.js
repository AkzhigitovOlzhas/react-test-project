import { useEffect, useState } from "react";
import { getPageCount } from "../utils/pages";

export const useAlbums = ({ url, limit }) => {
  const [albums, setAlbums] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("asc");
  const [albumsFilter, setAlbumsFilter] = useState("all");

  useEffect(() => {
    async function fetchAlbums() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${url}?_limit=${limit}&_page=${page}&_sort=albumId&_order=${sort}${
            albumsFilter !== "all" ? `&albumId=${albumsFilter}` : ""
          }`
        );

        if (response.ok) {
          const totalCount = response.headers.get("x-total-count");
          const data = await response.json();
          setTotalPages(getPageCount(totalCount, limit));
          setAlbums(data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAlbums();
  }, [url, limit, page, sort, albumsFilter]);

  function changePage(_event, page) {
    setPage(page);
  }

  function changeSort(sortType) {
    setSort(sortType);
  }

  function changeFilter(id) {
    setPage(1);
    setAlbumsFilter(id);
  }

  function removeAlbum(id) {
    setAlbums(albums.filter((album) => album.id !== id));
  }

  return [
    albums,
    isLoading,
    totalPages,
    changePage,
    page,
    sort,
    changeSort,
    albumsFilter,
    changeFilter,
    removeAlbum,
  ];
};
