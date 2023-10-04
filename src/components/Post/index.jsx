import { useState, useRef } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import Avatar from "@mui/material/Avatar";
import Profile from "../../assets/profile.jpg";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import { useCreatePostMutation } from "../../service/posts";
import { useEffect } from "react";

export default function Post({ userId }) {
  const [createPost, result] = useCreatePostMutation();
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // Common video file extensions
  const videoExtensions = [
    "mp4",
    "mkv",
    "avi",
    "mov",
    "wmv",
    "flv",
    "webm",
    "mpeg",
    "3gp",
  ];

  // Common image file extensions
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "webp"];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFileInputChange = () => {
    const selectedFile = fileInputRef.current.files[0];
    if (selectedFile) {
      const parts = selectedFile.name.split(".");
      const type = isVideoOrImageExtension(parts[parts.length - 1]);
      setFile({
        selectedFile,
        type,
      });
    }
  };

  function isVideoOrImageExtension(extension) {
    extension = extension.toLowerCase().replace(".", "");

    if (videoExtensions.includes(extension)) {
      return "video";
    }
    if (imageExtensions.includes(extension)) {
      return "image";
    }
    return "unknown";
  }

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (result.isSuccess) {
      setFile(null);
      setInputValue("");
    }
  }, [result]);

  return (
    <Card
      sx={{
        borderRadius: "10px",
        maxWidth: "800px",
        width: "95vw",
        height: "max-content",
        margin: "40px 0",
      }}
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
          <InputBase
            placeholder="Whats on your mind?"
            onChange={handleInputChange}
            value={inputValue}
            sx={{
              width: "100%",
              "& input::placeholder": {
                color: "#919eb2",
                fontWeight: "700",
                fontSize: "1.25rem",
              },
            }}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            padding: "5px 10px",
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
            multiple={false}
            accept={[...videoExtensions, ...imageExtensions]
              .map((ext) => `.${ext}`)
              .join(",")}
          />
          <Badge badgeContent={file ? 1 : 0} color="warning">
            <Chip
              icon={
                <PhotoLibraryIcon style={{ color: "white", padding: "3px" }} />
              }
              label="Photos/Videos"
              clickable
              color="primary"
              onClick={openFileDialog}
            />
          </Badge>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              if (inputValue.length || file) {
                const formData = new FormData();
                if (inputValue.length) formData.append("title", inputValue);
                formData.append("userId", userId);
                if (file) {
                  formData.append("type", file.type);
                  formData.append("file", file.selectedFile);
                }
                createPost(formData);
              }
            }}
          >
            Post it
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
