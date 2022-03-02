import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

export const AlbumItem = ({ album, handleOpenModal, removeAlbum }) => {
  return (
    <Card>
      <CardActionArea onClick={() => handleOpenModal(album)}>
        <CardMedia
          component="img"
          height="150"
          image={album.thumbnailUrl}
          alt={album.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Album id: {album.albumId}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {album.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="error"
          onClick={() => removeAlbum(album.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
