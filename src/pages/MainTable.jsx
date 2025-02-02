import React, { useState } from "react";
import { Table, Pagination, Popconfirm } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import AddModal from "../components/AddModal";
import DropdownMethod from "../components/DropDown";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../api/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const MainTable = () => {
  // Query parametrlari uchun state
  const [pageSize, setPageSize] = useState(10); // Har bir sahifadagi elementlar soni
  const [pageIndex, setPageIndex] = useState(1); // Joriy sahifa raqami
  const navigate = useNavigate();
  // Ma'lumotlarni olish
  const { data, error, isLoading } = useQuery({
    queryKey: ["dataTable"],
    queryFn: () => getData("/api/companies/get-all"),
    onSuccess: (res) => {
      console.log(data);
    },
    onError: (err) => {
      console.error("Fetch Error:", err);
    },
  });

  // Ma'lumot yuklanayotgan yoki xatolik holatlari
  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  // Jadval ustunlari
  const columns = [
    {
      title: "Название компании",
      dataIndex: "name", // API'dan kelgan ma'lumot nomi
      key: "name",
      render: (text, fullValue) => {
        return (
          <span
            onClick={() => navigate(`/table/${fullValue.id}`)}
            className="hover:underline cursor-pointer"
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Количество сотрудников",
      dataIndex: "count", // API'dan kelgan ma'lumot nomi
      key: "count",
    },
    {
      title: "Action",
      key: "action",
      render: (value, _, index) => {
        return (
          <div className="text-right">
            <DropdownMethod value={value} />
          </div>
        );
      },
    },
  ];

  // Sahifalash (pagination) funksiyasi
  const handleTableChange = (pagination) => {
    setPageIndex(pagination.current); // Joriy sahifani yangilash
    setPageSize(pagination.pageSize); // Sahifadagi elementlar sonini yangilash
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#313131] shadow h-16 flex items-center justify-between w-full px-5">
        <h1 className="text-xl font-bold text-white">Компании</h1>
        <div className="flex items-center">
          {/* logout confirm */}
          <Popconfirm
            title={`Вы уверены, что хотите выйти?`}
            onConfirm={() => logout()}
            cancelText="Нет"
            okText="Да"
          >
            <LogoutOutlined
              style={{ color: "white", fontSize: "25px", marginRight: 16 }}
            />
          </Popconfirm>
          {/* open addmodal */}
          <AddModal />
        </div>
      </div>

      {/* Jadval */}
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        pagination={
          data?.length > 10
            ? {
                current: pageIndex, // Joriy sahifa
                pageSize: pageSize, // Har sahifadagi elementlar soni
                total: data?.totalCount,
                showTotal: (total) => `Umumiy ma'lumotlar: ${total}`, // Umumiy elementlar soni (API'dan keladi)
              }
            : false // Agar umumiy ma'lumotlar soni 10 dan kam bo'lsa, pagination ko‘rinmaydi
        }
        onChange={handleTableChange} // Sahifalash funksiyasi
        className="antd-table m-4"
        bordered
        size="small"
      />
    </div>
  );
};

export default MainTable;
