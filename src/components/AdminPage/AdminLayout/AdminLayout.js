import React, { useState } from "react";
import "./AdminLayout.scss";
import { Link, NavLink } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { TOKEN_PATH } from "../../../tools/constants";
const AdminLayout = (props) => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const changeModal = () => {
    setOpen({ open: !open });
  };
  
  return (
    <div className="admin-layout">
      <div className="admin-navbar">
        <div className="menu-close d-md-none d-block">
          <svg
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ transform: menuOpen ? "rotateY(180deg)" : "" }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-right"
          >
            <line x1="-5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
      <div
        className={
          menuOpen
            ? "admin-content d-flex menu-visible"
            : "admin-content d-flex menu-hidden"
        }
      >
        <div className="admin-content-left">
          <div className="d-flex align-items-center">
            <div className="user-img">
              <span className="icon icon-user"></span>
            </div>
            <div className="avatar">
              <h4 className="mb-0">Abdulaziz</h4>
              <p className="mb-0">Administrator</p>
            </div>
          </div>
          <ul className="nav mt-4 flex-column">
            <li className="nav-item admin-menu">
              <NavLink
                activeClassName="selected"
                to="/admin"
                className="nav-link"
                activeStyle={{
                  fontWeight: "600",
                  color: "rgba(0, 0, 0)",
                }}
                exact={true}
              >
                Dashboard
              </NavLink>
            </li>
            <hr />
            <li className="nav-item admin-menu">
              <NavLink
                activeClassName="selected"
                to="/admin/dictants"
                className="nav-link"
                activeStyle={{
                  fontWeight: "600",
                  color: "rgb(0, 0, 0)",
                }}
                exact={true}
              >
                Diktantlar
              </NavLink>
            </li>
            <li className="nav-item admin-menu">
              <NavLink
                activeClassName="selected"
                to="/admin/dictantcategory"
                className="nav-link"
                activeStyle={{
                  fontWeight: "600",
                  color: "rgba(0, 0, 0)",
                }}
                exact={true}
              >
                Diktant Kategoriyalari
              </NavLink>
            </li>
            <hr />
            <li className="nav-item admin-menu">
              <NavLink
                activeClassName="selected"
                to="/admin/library"
                className="nav-link"
                activeStyle={{
                  fontWeight: "600",
                  color: "rgba(0, 0, 0)",
                }}
                exact={true}
              >
                Kitoblar
              </NavLink>
            </li>
            <li className="nav-item admin-menu">
              <NavLink
                activeClassName="selected"
                to="/admin/bookcategory"
                className="nav-link"
                activeStyle={{
                  fontWeight: "600",
                  color: "rgba(0, 0, 0)",
                }}
                exact={true}
              >
                Kitob Kategoriyalari
              </NavLink>
            </li>
            <hr />
            <li className="nav-item admin-menu">
              <NavLink
                activeClassName="selected"
                to="/admin/guide"
                className="nav-link"
                activeStyle={{
                  fontWeight: "600",
                  color: "rgba(0, 0, 0)",
                }}
                exact={true}
              >
                Qo'llanmalar
              </NavLink>
            </li>
            <li className="nav-item admin-menu">
              <NavLink
                activeClassName="selected"
                to="/admin/guidecategory"
                className="nav-link"
                activeStyle={{
                  fontWeight: "600",
                  color: "rgba(0, 0, 0)",
                }}
                exact={true}
              >
                Qo'llanma Kategoriyalari
              </NavLink>
            </li>
            <hr />
            <li className="nav-item admin-menu mt-4">
              <button
                style={{ border: "none", background: "none" }}
                onClick={changeModal}
                className="nav-link"
                activeStyle={{
                  fontWeight: "600",
                  color: "rgba(0, 0, 0)",
                }}
                exact={true}
              >
                Chiqish
              </button>
            </li>
          </ul>
          <Modal isOpen={open} toggle={changeModal}>
            <ModalBody>Rostan ham chiqmoqchimisiz ?</ModalBody>
            <ModalFooter>
              <Link
                className="btn btn-danger"
                type="button"
                to="/"
                onClick={() => localStorage.removeItem(TOKEN_PATH)}
              >
                Ha
              </Link>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setOpen(false)}
              >
                Yo'q
              </button>
            </ModalFooter>
          </Modal>
        </div>
        <div
          className={
            !menuOpen
              ? "admin-content-right admin-content-right-100"
              : "admin-content-right"
          }
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
