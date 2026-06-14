function Avatar({ name = "", image = null, size = 40 }) {
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.45
      }}
    >
      {image ? (
        <img src={image} alt="avatar" />
      ) : (
        initial
      )}
    </div>
  );
}

export default Avatar;