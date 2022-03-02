import { Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AlbumItem } from "..";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export const AlbumList = ({ albums, removeAlbum }) => {
  const [modal, setModal] = useState({ isVisible: false, albumData: null });

  function handleClose() {
    setModal({ isVisible: false, albumData: null });
  }

  function handleOpen(album) {
    if (album) {
      setModal({ isVisible: true, albumData: album });
    }
  }

  return (
    <Box sx={{ margin: "30px 0" }}>
      <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
        {albums.map((album) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
            <AlbumItem
              album={album}
              handleOpenModal={handleOpen}
              removeAlbum={removeAlbum}
            />
          </Grid>
        ))}
      </Grid>
      {modal.isVisible ? (
        <Modal
          open={modal.isVisible}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img alt="" src={modal.albumData.url} style={{ width: "100%" }} />
          </Box>
        </Modal>
      ) : null}
    </Box>
  );
};
