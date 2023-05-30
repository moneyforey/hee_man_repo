import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../Img/Rectangle 7.png";
import TalentfestIcon from "../../Img/material-symbols_diamond.svg";
import BlogsIcon from "../../Img/ph_address-book-fill (1).svg";
import UsersIcon from "../../Img/ph_users-bold.svg";
import SalesIcon from "../../Img/ph_users-bold (1).svg";
import TasksIcon from "../../Img/fluent_task-list-square-rtl-24-regular.svg";
import AnalyticsIcon from "../../Img/mdi_graph-box-outline.svg";
import ComplaintsIcon from "../../Img/mdi_emoticon-angry-outline.svg";

const SideBar = () => {
  const location = useLocation();
  let Path = location.pathname;

  return (
    <>
      <div style={{ backgroundColor: "black", height: "100vh" }}>
        <div className="p-2">
          <img alt="Logo" src={Logo} width="90%" />
        </div>
        <div
          style={{
            boxSizing: "border-box",
            overflowY: "scroll",
            width: "95%",
            height: "90vh",
            overflowX: "hidden",
          }}
        >
          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "30px",
              backgroundColor: Path === "/Home" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/Home"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <div className="row">
                <div className="col-2">
                  <svg
                    width="20"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.52 0.191992C12.3751 0.0680481 12.1907 -6.10352e-05 12 -6.10352e-05C11.8093 -6.10352e-05 11.6249 0.0680481 11.48 0.191992L0 10.032V21.6C0 22.2365 0.252856 22.847 0.702944 23.297C1.15303 23.7471 1.76348 24 2.4 24H8.8C9.01217 24 9.21566 23.9157 9.36569 23.7657C9.51571 23.6157 9.6 23.4122 9.6 23.2V18.4C9.6 17.7635 9.85286 17.153 10.3029 16.7029C10.753 16.2528 11.3635 16 12 16C12.6365 16 13.247 16.2528 13.6971 16.7029C14.1471 17.153 14.4 17.7635 14.4 18.4V23.2C14.4 23.4122 14.4843 23.6157 14.6343 23.7657C14.7843 23.9157 14.9878 24 15.2 24H21.6C22.2365 24 22.847 23.7471 23.2971 23.297C23.7471 22.847 24 22.2365 24 21.6V10.032L12.52 0.191992Z"
                      fill={Path === "/Home" ? "#F44CC5" : "#8A8A8A"}
                    />
                  </svg>
                </div>
                <div className="col-10 " style={{ marginLeft: "-10px" }}>
                  <span className="ms-2">Home</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "30px",
              backgroundColor: Path === "/Exam" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/Exam"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <div className="row">
                <div className="col-2">
                  <svg
                    width="22"
                    height="26"
                    viewBox="0 0 22 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.375 0.34375H4.4375C3.31862 0.34375 2.24556 0.788224 1.45439 1.57939C0.663224 2.37056 0.21875 3.44362 0.21875 4.5625V24.25C0.21875 24.623 0.366908 24.9806 0.630631 25.2444C0.894354 25.5081 1.25204 25.6562 1.625 25.6562H18.5C18.873 25.6562 19.2306 25.5081 19.4944 25.2444C19.7581 24.9806 19.9062 24.623 19.9062 24.25C19.9062 23.877 19.7581 23.5194 19.4944 23.2556C19.2306 22.9919 18.873 22.8438 18.5 22.8438H3.03125V22.375C3.03125 22.002 3.17941 21.6444 3.44313 21.3806C3.70685 21.1169 4.06454 20.9688 4.4375 20.9688H20.375C20.748 20.9688 21.1056 20.8206 21.3694 20.5569C21.6331 20.2931 21.7812 19.9355 21.7812 19.5625V1.75C21.7812 1.37704 21.6331 1.01935 21.3694 0.755631C21.1056 0.491908 20.748 0.34375 20.375 0.34375ZM18.9688 18.1562H4.4375C3.95784 18.154 3.48163 18.2373 3.03125 18.4023V4.5625C3.03125 4.18954 3.17941 3.83185 3.44313 3.56813C3.70685 3.30441 4.06454 3.15625 4.4375 3.15625H18.9688V18.1562Z"
                      fill={
                        Path === "/Exam"
                          ? "url(#paint0_linear_6_1163)"
                          : "#8A8A8A"
                      }
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6_1163"
                        x1="11"
                        y1="0.34375"
                        x2="11"
                        y2="25.6562"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#17CBCB" />
                        <stop offset="1" stop-color="#17CBCB" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="col-10 " style={{ marginLeft: "-10px" }}>
                  <span className="ms-2"> Exam & Quiz</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "30px",
              backgroundColor: Path === "/Talentfest" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/Talentfest"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <img sty alt="TalentfestIcon" src={TalentfestIcon} />
              <span className="ms-2">Talentfest</span>
            </NavLink>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "30px",
              backgroundColor: Path === "/Study" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/Study"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <div className="row">
                <div className="col-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 10.5C15 10.945 14.868 11.38 14.6208 11.75C14.3736 12.12 14.0222 12.4084 13.611 12.5787C13.1999 12.749 12.7475 12.7936 12.311 12.7068C11.8746 12.62 11.4737 12.4057 11.159 12.091C10.8443 11.7763 10.63 11.3754 10.5432 10.939C10.4564 10.5025 10.501 10.0501 10.6713 9.63896C10.8416 9.22783 11.13 8.87643 11.5 8.62919C11.87 8.38196 12.305 8.25 12.75 8.25C13.346 8.25247 13.9168 8.49031 14.3383 8.91174C14.7597 9.33316 14.9975 9.90402 15 10.5ZM21 3.75V20.25C21 20.6478 20.842 21.0294 20.5607 21.3107C20.2794 21.592 19.8978 21.75 19.5 21.75H6C5.60218 21.75 5.22064 21.592 4.93934 21.3107C4.65804 21.0294 4.5 20.6478 4.5 20.25V18.375H3C2.80109 18.375 2.61032 18.296 2.46967 18.1553C2.32902 18.0147 2.25 17.8239 2.25 17.625C2.25 17.4261 2.32902 17.2353 2.46967 17.0947C2.61032 16.954 2.80109 16.875 3 16.875H4.5V14.625H3C2.80109 14.625 2.61032 14.546 2.46967 14.4053C2.32902 14.2647 2.25 14.0739 2.25 13.875C2.25 13.6761 2.32902 13.4853 2.46967 13.3447C2.61032 13.204 2.80109 13.125 3 13.125H4.5V10.875H3C2.80109 10.875 2.61032 10.796 2.46967 10.6553C2.32902 10.5147 2.25 10.3239 2.25 10.125C2.25 9.92609 2.32902 9.73532 2.46967 9.59467C2.61032 9.45402 2.80109 9.375 3 9.375H4.5V7.125H3C2.80109 7.125 2.61032 7.04598 2.46967 6.90533C2.32902 6.76468 2.25 6.57391 2.25 6.375C2.25 6.17609 2.32902 5.98532 2.46967 5.84467C2.61032 5.70402 2.80109 5.625 3 5.625H4.5V3.75C4.5 3.35218 4.65804 2.97064 4.93934 2.68934C5.22064 2.40804 5.60218 2.25 6 2.25H19.5C19.8978 2.25 20.2794 2.40804 20.5607 2.68934C20.842 2.97064 21 3.35218 21 3.75ZM17.85 15.3C17.1863 14.409 16.3006 13.7076 15.2812 13.2656C15.8389 12.7554 16.2294 12.0886 16.4015 11.3525C16.5736 10.6165 16.5192 9.84566 16.2456 9.14106C15.9719 8.43647 15.4917 7.83103 14.8679 7.40413C14.2441 6.97723 13.5059 6.74881 12.75 6.74881C11.9941 6.74881 11.2559 6.97723 10.6321 7.40413C10.0083 7.83103 9.5281 8.43647 9.25443 9.14106C8.98075 9.84566 8.92639 10.6165 9.09847 11.3525C9.27056 12.0886 9.66105 12.7554 10.2188 13.2656C9.19942 13.7076 8.31374 14.409 7.65 15.3C7.53065 15.4591 7.47941 15.6592 7.50754 15.8561C7.53567 16.053 7.64087 16.2307 7.8 16.35C7.92882 16.4493 8.08739 16.5021 8.25 16.5C8.36643 16.5 8.48127 16.4729 8.58541 16.4208C8.68955 16.3687 8.78014 16.2931 8.85 16.2C9.30409 15.5945 9.89291 15.1031 10.5698 14.7647C11.2468 14.4262 11.9932 14.25 12.75 14.25C13.5068 14.25 14.2532 14.4262 14.9302 14.7647C15.6071 15.1031 16.1959 15.5945 16.65 16.2C16.7708 16.3571 16.9483 16.4607 17.1445 16.4887C17.3407 16.5167 17.54 16.4669 17.7 16.35C17.7788 16.2909 17.8452 16.2169 17.8954 16.1321C17.9455 16.0474 17.9785 15.9536 17.9925 15.8561C18.0064 15.7586 18.001 15.6593 17.9765 15.5639C17.9521 15.4685 17.9091 15.3788 17.85 15.3Z"
                      fill={
                        Path === "/Study"
                          ? "url(#paint0_linear_6_1163)"
                          : "#8A8A8A"
                      }
                    />
                  </svg>
                </div>
                <div className="col-10 " style={{ marginLeft: "-10px" }}>
                  <span className="ms-2">Study Material</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "40px",
              backgroundColor: Path === "/Blogs" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/Blogs"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <img style={{
                background: Path === "/Blogs"
                ? "url(#paint0_linear_6_1163)"
                : "tranparent"
              }} alt="BlogsIcon" src={BlogsIcon} />
              <span className="ms-2">Blogs</span>
            </NavLink>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "40px",
              backgroundColor: Path === "/Complaints" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/Complaints"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <img alt="ComplaintsIcon" src={ComplaintsIcon} />
              <span className="ms-2">Complaints</span>
            </NavLink>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "40px",
              backgroundColor: Path === "/User" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/User"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1125 14.7093C13.0542 13.9171 13.7296 12.8544 14.047 11.6654C14.3644 10.4763 14.3085 9.21845 13.8869 8.06226C13.4652 6.90607 12.6982 5.9075 11.6899 5.20193C10.6816 4.49636 9.48067 4.11792 8.24999 4.11792C7.01932 4.11792 5.81841 4.49636 4.81008 5.20193C3.80175 5.9075 3.03477 6.90607 2.61313 8.06226C2.19148 9.21845 2.13557 10.4763 2.45298 11.6654C2.77038 12.8544 3.44574 13.9171 4.38749 14.7093C2.86016 15.4005 1.54585 16.4882 0.581242 17.8593C0.41004 18.1031 0.342517 18.4049 0.393485 18.6984C0.444452 18.9919 0.609748 19.2532 0.853117 19.425C1.04179 19.5598 1.26808 19.632 1.49999 19.6312C1.68038 19.6317 1.8582 19.5885 2.01821 19.5052C2.17823 19.422 2.31566 19.3011 2.41874 19.1531C3.07604 18.2169 3.94908 17.4527 4.96406 16.9252C5.97903 16.3977 7.1061 16.1222 8.24999 16.1222C9.39388 16.1222 10.5209 16.3977 11.5359 16.9252C12.5509 17.4527 13.4239 18.2169 14.0812 19.1531C14.1627 19.2819 14.2695 19.3928 14.3952 19.479C14.5208 19.5653 14.6627 19.6251 14.8122 19.6549C14.9616 19.6847 15.1156 19.6838 15.2647 19.6522C15.4138 19.6207 15.555 19.5592 15.6796 19.4714C15.8042 19.3837 15.9097 19.2715 15.9897 19.1418C16.0696 19.012 16.1224 18.8674 16.1447 18.7167C16.1671 18.5659 16.1586 18.4122 16.1198 18.2648C16.0809 18.1174 16.0125 17.9795 15.9187 17.8593C14.9541 16.4882 13.6398 15.4005 12.1125 14.7093ZM4.49999 10.125C4.49999 9.38328 4.71993 8.65826 5.13198 8.04157C5.54404 7.42489 6.12971 6.94424 6.81493 6.66041C7.50015 6.37658 8.25415 6.30232 8.98158 6.44702C9.70901 6.59171 10.3772 6.94886 10.9016 7.47331C11.4261 7.99776 11.7832 8.66594 11.9279 9.39337C12.0726 10.1208 11.9984 10.8748 11.7145 11.56C11.4307 12.2452 10.9501 12.8309 10.3334 13.243C9.71669 13.655 8.99167 13.875 8.24999 13.875C7.25543 13.875 6.3016 13.4799 5.59834 12.7766C4.89508 12.0733 4.49999 11.1195 4.49999 10.125ZM23.2875 19.425C23.0988 19.5598 22.8725 19.632 22.6406 19.6312C22.4605 19.6302 22.2833 19.5863 22.1235 19.5031C21.9637 19.42 21.8261 19.3 21.7219 19.1531C21.0632 18.2185 20.1898 17.4557 19.175 16.9288C18.1603 16.4019 17.034 16.1262 15.8906 16.125C15.5922 16.125 15.3061 16.0064 15.0951 15.7955C14.8841 15.5845 14.7656 15.2983 14.7656 15C14.7656 14.7016 14.8841 14.4154 15.0951 14.2045C15.3061 13.9935 15.5922 13.875 15.8906 13.875C16.8852 13.875 17.839 13.4799 18.5423 12.7766C19.2455 12.0733 19.6406 11.1195 19.6406 10.125C19.6406 9.1304 19.2455 8.17657 18.5423 7.47331C17.839 6.77005 16.8852 6.37496 15.8906 6.37496C15.5482 6.37432 15.2074 6.42165 14.8781 6.51559C14.7351 6.55824 14.5851 6.57202 14.4367 6.55612C14.2884 6.54023 14.1446 6.49498 14.0139 6.42301C13.8832 6.35104 13.7681 6.25379 13.6754 6.13692C13.5826 6.02004 13.514 5.88588 13.4736 5.74225C13.4332 5.59861 13.4217 5.44837 13.4399 5.30027C13.4582 5.15218 13.5056 5.00918 13.5796 4.87961C13.6536 4.75004 13.7527 4.63648 13.871 4.54555C13.9893 4.45462 14.1245 4.38813 14.2687 4.34996C14.7962 4.19978 15.3421 4.12405 15.8906 4.12496C17.1221 4.12138 18.3248 4.49743 19.3349 5.2019C20.345 5.90637 21.1135 6.90503 21.5356 8.0619C21.9578 9.21878 22.0132 10.4777 21.6942 11.6671C21.3753 12.8566 20.6975 13.9189 19.7531 14.7093C21.2805 15.4005 22.5948 16.4882 23.5594 17.8593C23.6454 17.9796 23.7066 18.1158 23.7395 18.2599C23.7724 18.4041 23.7763 18.5534 23.751 18.699C23.7257 18.8447 23.6717 18.9839 23.5921 19.1085C23.5125 19.2332 23.409 19.3407 23.2875 19.425Z"
                  fill={
                    Path === "/User" ? "url(#paint0_linear_6_1163)" : "#8A8A8A"
                  }
                />
              </svg>
              <span className="ms-2">Users</span>
            </NavLink>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "40px",
              backgroundColor: Path === "/Sales" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/Sales"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <img alt="SalesIcon" src={SalesIcon} />
              <span className="ms-2">Sales</span>
            </NavLink>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "40px",
              backgroundColor: Path === "/Analytics" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/Analytics"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <img alt="AnalyticsIcon" src={AnalyticsIcon} />
              <span className="ms-2">Analytics</span>
            </NavLink>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "40px",
              backgroundColor: Path === "/Task" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/Task"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <img alt="TasksIcon" src={TasksIcon} />
              <span className="ms-2">Tasks</span>
            </NavLink>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "40px",
              backgroundColor: Path === "/Banner" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/Banner"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <img alt="SalesIcon" src={SalesIcon} />
              <span className="ms-2">Banner Images</span>
            </NavLink>
          </div>

          <div
            className="row"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "40px",
              backgroundColor: Path === "/Rooms" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/Rooms"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <img alt="SalesIcon" src={SalesIcon} />
              <span className="ms-2">Rooms</span>
            </NavLink>
          </div>

          <div
            className="row mb-5"
            style={{
              justifyContent: "center",
              marginLeft: "10px",
              marginTop: "40px",
              backgroundColor: Path === "/withdrawal" ? "#303030" : "",
            }}
          >
            <NavLink
              className="p-2"
              to="/withdrawal"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <img alt="SalesIcon" src={SalesIcon} /> 
              <span className="ms-2">Withdrawals</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
