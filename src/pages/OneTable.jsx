import { Popconfirm, Table } from "antd";
import React from "react";
import DropdownMethod from "../components/DropDown";
import {
  BackwardOutlined,
  LogoutOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDataOne } from "../api/api";
import Loader from "../components/Loader";

const OneTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["tableOne"],
    queryFn: () => getDataOne(`/api/companies/get/${id}`),
    onSuccess: () => {
      console.log("true");
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  const columns = [
    {
      title: "Название компании",
      dataIndex: "name", // API'dan kelgan ma'lumot nomi
      key: "name",
    },
    {
      title: "Количество сотрудников",
      dataIndex: "count", // API'dan kelgan ma'lumot nomi
      key: "count",
    },
  ];
  return (
    <div>
      <div className="bg-[#313131] shadow h-16 flex items-center justify-between w-full px-5">
        <div className="flex items-center gap-2">
          <RollbackOutlined
            style={{ fontSize: "25px", color: "white" }}
            onClick={() => navigate("/")}
          />
          <h1 className="text-xl font-bold text-white">Компании</h1>
        </div>
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
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={Array.isArray(data) ? data : [data]}
        rowKey={(record) => record.id}
        pagination={false}
      />
    </div>
  );
};

export default OneTable;
