import React, { Component } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";

export class BookComments extends Component {
  render() {
    return (
      <AdminLayout>
        <div className="admin-comments">
          <table className="table table-striped table-hover mt-3">
            <thead>
              <tr>
                <th>Ismi Familiyasi</th>
                <th>Email pochtasi</th>
                <th>Kommentariyasi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Toshpo'latov Abdulaziz</td>
                <td>abdulazizprogrammer@gmail.com</td>
                <td className="comment-box">
                  <span>
                    Birinchi sinfda xat-savod davri tugagach, dastlabki diktant
                    yozdirishga kirishish ta’limda eng ma’suliyatli ish
                    hisoblanadi. Xali mutaqil ravishda eshitib, harf va
                    so‘zlarni yozish bolalar uchun ham qiyin, ham zavqli
                    bo‘ladi. O‘qituvchi bolalarni ruhlantirib: “Balli, yoza
                    oldingiz” – deb dalda berishi,
                  </span>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    D
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminLayout>
    );
  }
}

export default BookComments;
