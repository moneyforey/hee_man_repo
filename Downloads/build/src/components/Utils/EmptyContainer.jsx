const EmptyContainer = ({ message, action, actionName }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "2rem",
        alignItems: "center",
        justifyContent: "center",
        color: "#c8cdd8",
      }}
    >
      <img
        src="https://assets.pharmeasy.in/web-assets/dist/bb14593e.svg"
        alt="empty conatinet"
      />
      <h3>{message}</h3>
      <button
        onClick={() => action()}
        style={{
          color: "#c8cdd8",
          padding: "0 1rem 0 1rem",
        }}
        type="button"
        className="btn btn-light"
      >
        {actionName}
      </button>
    </div>
  );
};

export default EmptyContainer;
