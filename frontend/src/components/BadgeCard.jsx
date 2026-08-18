function BadgeCard({ badge }) {

  return (
    <div
      style={{
        border: "1px solid green",
        padding: "10px",
        margin: "10px"
      }}
    >
      🏆 {badge}
    </div>
  );
}

export default BadgeCard;