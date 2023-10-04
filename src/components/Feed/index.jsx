import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Profile from "../../assets/profile.jpg";
import Media from "../Media";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import Comments from "./Comments";
import { useGetPostsQuery, useDeletePostMutation } from "../../service/posts";
import { useMediaQuery } from "@mui/material";

export default function Feed({ userId }) {
  const [posts, setPosts] = useState([]);
  const [deletePost] = useDeletePostMutation();

  const isSm = useMediaQuery("(min-width: 600px)");

  const postsApi = useGetPostsQuery({
    userId,
    params: "?page=1&perPage=10",
  });

  useEffect(() => {
    if (postsApi.isSuccess) {
      let posts = postsApi.data.map((e) => {
        let newE = { ...e };
        newE.open = false;
        newE.like = false;
        return newE;
      });
      setPosts(posts);
    }
  }, [postsApi.isFetching]);

  function handleAction(field, id) {
    let newPosts = [...posts];
    let index = newPosts.findIndex((v) => v._id == id);
    newPosts[index][field] = !newPosts[index][field];
    setPosts(newPosts);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {posts.map((e, i) => (
        <Card
          sx={{
            borderRadius: "10px",
            maxWidth: "800px",
            width: "95vw",
            height: "max-content",
            marginBottom: i == posts.length - 1 ? "20px" : "",
          }}
          key={e._id}
        >
          <CardContent>
            <div
              style={{
                padding: "5px 10px",
                marginBottom: "10px",
                display: "flex",
                gap: "20px",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={Profile}
                sx={{ width: 56, height: 56 }}
              />
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#5a5a67",
                    paddingLeft: "4px",
                    paddingBottom: "2px",
                  }}
                >
                  Hassan Ahmad
                </p>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#6293f3",
                  }}
                >
                  <LocationOnIcon style={{ height: "18px", width: "18px" }} />
                  <p>Lahore, Pakistan</p>
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                color: "#6d6d79",
                padding: "5px",
              }}
            >
              {e.title}
            </p>
            {e?.file ? <Media file={e.file} /> : null}
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                color: "#6d6d79",
                padding: "5px",
              }}
            >
              <span style={{ marginRight: "5px" }}>{e.like ? 1 : 0} Likes</span>{" "}
              • <span style={{ marginLeft: "5px" }}>0 comments</span>
            </p>
          </CardContent>
          <Divider />
          <CardActions style={{ background: "#f7f7f7" }}>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "20px",
                  padding: "5px 10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    color: e.like ? "#6293f3" : "",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAction("like", e._id)}
                >
                  <FavoriteIcon
                    style={{
                      fontSize: "1.2rem",
                      height: "15px",
                      width: "15px",
                    }}
                  />
                  <p>Like</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    cursor: "pointer",
                    color: e.open ? "#6293f3" : "",
                  }}
                  onClick={() => handleAction("open", e._id)}
                >
                  <CommentIcon
                    style={{
                      height: "15px",
                      width: "15px",
                      fontSize: "1.2rem",
                    }}
                  />
                  <p>Comment</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    cursor: "pointer",
                    color: e.open ? "#6293f3" : "",
                  }}
                  onClick={() => deletePost(e._id)}
                >
                  <DeleteIcon
                    style={{
                      height: "15px",
                      width: "15px",
                      fontSize: "1.2rem",
                    }}
                  />
                  <p>Delete</p>
                </div>
              </div>
              {e.open ? <Comments /> : null}
            </div>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
