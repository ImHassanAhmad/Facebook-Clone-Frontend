import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Profile from "../../../assets/profile.jpg";
import InputBase from "@mui/material/InputBase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Feed() {
  return (
    <>
      <div
        style={{
          padding: "5px 10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "5px",
          marginTop: "10px",
        }}
      >
        <Avatar alt="Remy Sharp" src={Profile} sx={{ width: 40, height: 40 }} />
        <div
          style={{
            borderRadius: "30px",
            border: "1px solid grey",
            width: "100%",
            padding: "5px",
          }}
        >
          <InputBase
            placeholder="Add a comment"
            sx={{
              width: "100%",
              marginLeft: "10px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          padding: "5px 10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "5px",
          marginTop: "10px",
        }}
      >
        <Avatar alt="Remy Sharp" src={Profile} sx={{ width: 40, height: 40 }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            borderRadius: "10px",
            background: "#dae1ea",
            margin: "20px",
            width: "100%",
            padding: "10px",
            fontSize: "0.9rem",
          }}
        >
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>Hassan Ahmad</p>
            <p>11 minutes ago</p>
          </span>
          <p style={{ color: "#6293f3" }}>Professional-Student</p>
          <p>This is what a comment looks like!</p>
          <div style={{ display: "flex", gap: "6px" }}>
            <span>0 Likes |</span>
            <FavoriteIcon
              style={{
                width: "14px",
                height: "14px",
                marginTop: "1px",
              }}
            />
            <span>Like |</span>
            <EditIcon
              style={{
                width: "14px",
                height: "14px",
                marginTop: "1px",
              }}
            />
            <span>Edit |</span>
            <DeleteIcon
              style={{
                width: "14px",
                height: "14px",
                marginTop: "1px",
              }}
            />
            <span>Delete</span>
          </div>
        </div>
      </div>
    </>
  );
}
