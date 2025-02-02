import React, { useState } from "react";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dropdown, Space, Popconfirm, Modal, Input, Form, Button } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteData, editData } from "../api/api";
import { openNotification } from "./uiNotification";

const DropdownMethod = ({ value }) => {
  // STATES
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Loader state
  // TANSTACK
  //// delelte mutate
  const { mutate } = useMutation({
    mutationKey: ["dataTable"],
    mutationFn: (id) => deleteData(`/api/companies/delete/by-id/`, id),
    onSuccess: () => {
      openNotification("success", "Компания успешно удалена!");
      queryClient.invalidateQueries(["dataTable"]);
    },
    onError: (error) => {
      openNotification("error", error.message || "Ошибка при удалении");
    },
  });
  //// edit mutate
  const { mutate: editMutate } = useMutation({
    mutationKey: ["dataTable"],
    mutationFn: (editObj) => editData(`/api/companies/update`, editObj),
    onSuccess: () => {
      setLoading(false);
      queryClient.invalidateQueries(["dataTable"]);
      openNotification("success", "Компания успешно обновлена!");
      setIsModalOpen(false);
    },
    onError: (error) => {
      setLoading(false);
      openNotification("info", error.message || "Ошибка при обновлена");
    },
  });

  // **EDIT Modal ochish va inputlarga eski qiymatlarni joylash**
  const handleEdit = () => {
    form.setFieldsValue(value); // eski qiymatlarni inputlarga qo‘yish
    setIsModalOpen(true); // Modalni ochish
  };

  const handleSave = (fullValue) => {
    form.validateFields().then((values) => {
      setLoading(true);
      editMutate({ ...values, id: fullValue.id }); // EDIT-MUTATE CHAQIRISH
    });
  };

  const items = [
    {
      label: "Изменить", // "Edit"
      key: "1",
      icon: <EditOutlined />,
      onClick: handleEdit,
    },
    {
      label: (
        <Popconfirm
          title={`Вы уверены, ${value.name} хотите удалить?`}
          onConfirm={() => mutate(value.id)}
          cancelText="Нет"
          okText="Да"
        >
          <span style={{ color: "red" }}>Удалить</span>
        </Popconfirm>
      ),
      key: "2",
      icon: <DeleteOutlined style={{ color: "red" }} />,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items: items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MoreOutlined
              style={{ color: "black", fontSize: "25px", marginRight: "10px" }}
            />
          </Space>
        </a>
      </Dropdown>

      {/* **Edit Modal** */}
      <Modal
        title="Редактировать компанию"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false} // Modalni tashqarisini bosganda yopilishiga yo‘l qo‘ymaydi
        closable={!loading} // Modal title yonidagi 'x' tugmachasini loading paytida o‘chiradi
        footer={[
          <Button
            key="cancel"
            disabled={loading}
            onClick={() => setIsModalOpen(false)}
          >
            Отмена
          </Button>,
          <Button
            key="save"
            type="primary"
            loading={loading}
            onClick={() => handleSave(value)}
          >
            Сохранить
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Название компании"
            name="name"
            rules={[{ required: true, message: "Введите название!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Количество сотрудников"
            name="count"
            rules={[{ required: true, message: "Введите количество!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DropdownMethod;
