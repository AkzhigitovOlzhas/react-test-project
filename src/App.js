import {
  CircularProgress,
  Container,
  createTheme,
  Pagination,
  ThemeProvider,
} from "@mui/material";
import { useAlbums } from "./hooks/useAlbums";
import { AlbumList, Header } from "./components";
import "./App.sass";
import { Box } from "@mui/system";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [
    albums,
    isLoading,
    pageCount,
    changePage,
    page,
    sortType,
    changeSort,
    filterId,
    changeFilter,
    removeAlbum,
  ] = useAlbums({
    url: "https://jsonplaceholder.typicode.com/photos",
    limit: 20,
  });

  function changeSortHandler(e) {
    changeSort(e.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header
          sortType={sortType}
          filterId={filterId}
          changeSortHandler={changeSortHandler}
          changeFilter={changeFilter}
        />
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : albums.length > 0 ? (
          <>
            <AlbumList albums={albums} removeAlbum={removeAlbum} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <Pagination
                count={pageCount}
                onChange={changePage}
                page={page}
                variant="outlined"
                color="primary"
                shape="rounded"
                size="large"
              />
            </Box>
          </>
        ) : (
          <h1>Nothing found</h1>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
