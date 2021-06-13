import { React, useEffect, useState } from "react";
import "./TodoNew.css";
import axios from "axios";
import { Table } from "antd";

function Paging() {
  const [contacts, setContacts] = useState([]);
  const [paramsContact, setParamsContact] = useState({ limit: 5, offset: 0 });
  const [loading, setLoading] = useState(false);

  const fetch = (page) => {
    setLoading(true);
    axios
      .get(
        "https://gateway.smartcontactcenter.xyz/smart-contact-center-contact-list-management/api/v1/omni-contact-list-normalizations",
        {
          params: {
            filter: {
              limit: page.limit,
              offset: page.offset,
            },
          },
        }
      )
      .then((res) => {
        let params = res.data.pop();
        setContacts(res.data);
        setParamsContact({
          limit: params.limit,
          offset: params.offset,
          total: params.total,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(paramsContact);
  }, []);

  const handleTableChange = (page, pageSize) => {
    let currentPage = {
      current: (page.current - 1) * page.pageSize,
      pageSize: pageSize,
    };
    console.log(page);
    fetch(currentPage);
  };

  //define table
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "15%",
    },
    {
      title: "Họ tên",
      dataIndex: "ho_va_ten",
      key: "ho_va_ten",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
  ];

  //define data for table
  const data = contacts;
  const tablePagination = {
    pageSize: paramsContact.limit,
    page: paramsContact.offset / paramsContact.limit + 1,
    total: paramsContact.total,
    pageSizeOptions: ["5", "10", "15", "20", "25"],
    showSizeChanger: true,
  };
  return (
    <div className="TodoNew">
      <Table
        columns={columns}
        dataSource={data}
        pagination={tablePagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default Paging;
