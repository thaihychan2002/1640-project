export default function NoPost() {
  return (
    <div>
      <div className="no-post" style={{ marginTop: "25%" }}>
        <img
          style={{ height: "100px", width: "100px" }}
          src="https://thumbs.dreamstime.com/b/pictograph-light-bulb-icon-circle-vector-iconic-design-symbol-white-background-98493546.jpg"
          alt="icon"
        />
      </div>
      <h1 className="no-post">No ideas searched</h1>
      <h3 className="no-post">
        Please type a correct name of author, or title, or content to search
      </h3>
    </div>
  );
}
