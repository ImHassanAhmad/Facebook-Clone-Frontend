export default function Media({ file }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {file.type === "image" ? (
        <img
          src={"http://localhost:3000/assets/" + file.url}
          style={{
            maxHeight: "500px",
            maxWidth: "100%",
            borderRadius: "10px",
            margin: "10px 0",
          }}
          loading="lazy"
        />
      ) : file.type === "video" ? (
        <video
          controls
          style={{
            maxHeight: "500px",
            maxWidth: "100%",
            borderRadius: "10px",
            margin: "10px 0",
          }}
          src={"http://localhost:3000/assets/" + file.url}
          loading="lazy"
        >
          Your browser does not support the video tag.
        </video>
      ) : null}
    </div>
  );
}
