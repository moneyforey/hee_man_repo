import { AiOutlineArrowRight } from "react-icons/ai";

const All = () => {
  const cardData = [
    {
      Name: "Rahul Sharma",
      email: "abhishek.sharma34567@gmail.com",
      Content: " +91 8529877896",
      Dob: "03-Jan-1995",
      unpaid: "Unpaid",
      ddd: "View Details",
    },
    {
      Name: "Rahul Sharma",
      email: "abhishek.sharma34567@gmail.com",
      Content: " +91 8529877896",
      Dob: "03-Jan-1995",
      unpaid: "Unpaid",
      ddd: "View Details",
    },
    {
      Name: "Rahul Sharma",
      email: "abhishek.sharma34567@gmail.com",
      Content: " +91 8529877896",
      Dob: "03-Jan-1995",
      unpaid: "Unpaid",
      ddd: "View Details",
    },
    {
      Name: "Rahul Sharma",
      email: "abhishek.sharma34567@gmail.com",
      Content: " +91 8529877896",
      Dob: "03-Jan-1995",
      unpaid: "Unpaid",
      ddd: "View Details",
    },
    {
      Name: "Rahul Sharma",
      email: "abhishek.sharma34567@gmail.com",
      Content: " +91 8529877896",
      Dob: "03-Jan-1995",
      unpaid: "Unpaid",
      ddd: "View Details",
    },
    {
      Name: "Rahul Sharma",
      email: "abhishek.sharma34567@gmail.com",
      Content: " +91 8529877896",
      Dob: "03-Jan-1995",
      unpaid: "Unpaid",
      ddd: "View Details",
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <table class="table mt-3">
            <thead>
              <tr
                style={{
                  border: "none",
                  display: "flex",
                  justifyContent: "space-around",
                  color: "#8a8a8a",
                }}
              >
                <th scope="col" style={{ border: "none" }}>
                  Name
                </th>
                <th scope="col  " className="me-5" style={{ border: "none" }}>
                  E-mail
                </th>
                <th scope="col  " className="ms-5" style={{ border: "none" }}>
                  Contact Number
                </th>
                <th scope="col" style={{ border: "none" }}>
                  DOB
                </th>
                <th scope="col" style={{ border: "none" }}>
                  Status
                </th>
                <th scope="col" style={{ opacity: "0", border: "none" }}>
                  {" "}
                  ss
                </th>
              </tr>
            </thead>
          </table>

          <div style={{ overflowY: "scroll", height: "50vh" }}>
            {cardData.map((res, key) => {
              return (
                <div class="card mt-3" style={{ border: "none" }} key={key}>
                  <div
                    class="card-body"
                    style={{ border: "1px solid gray", borderRadius: "8px" }}
                  >
                    <div className="row">
                      <div className="col-2">
                        <p className=" pt-1">{res.Name}</p>
                      </div>

                      <div className="col-3">
                        <span className=" pt-1" style={{ float: "left" }}>
                          {res.email}
                        </span>
                      </div>
                      <div className="col-2">
                        <p className=" pt-1">{res.Content}</p>
                      </div>
                      <div className="col-2">
                        <p className="text-center pt-1"> {res.Dob}</p>
                      </div>
                      <div className="col-1">
                        <div className="ms-4" style={{ display: "flex" }}>
                          <button
                            style={{
                              backgroundColor: "#fff1f1",
                              color: "#cc1313",
                              border: "none",
                              padding: "6px 10px",
                              borderRadius: "8px",
                              textAlign: "center",
                            }}
                          >
                            {res.unpaid}
                          </button>
                        </div>
                      </div>

                      <div className="col-2">
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <button
                            style={{
                              backgroundColor: "transparent",
                              color: "#2188E7",
                              border: "none",
                              padding: "5px",
                              borderRadius: "8px",
                              textAlign: "center",
                            }}
                          >
                            {res.ddd} <AiOutlineArrowRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <nav aria-label="Page navigation example">
            <ul
              class="pagination fixed-bottom"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  ..........
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  7
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  8
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  9
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default All;
