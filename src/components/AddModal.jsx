import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { openNotification } from "./uiNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../api/api";

const AddModal = () => {
  // STATES
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const [form] = Form.useForm();

  // MODAL-METHOD
  const showModal = () => {
    setOpen(true);
  };
  const handleFinish = (values) => {
    setLoading(true);
    mutate(values);
    form.resetFields();
  };
  // TANSTACK
  const queryClient = useQueryClient();
  //// POST-MUTATE
  const { mutate } = useMutation({
    mutationKey: ["dataTable"],
    mutationFn: (values) => postData("/api/companies/add", values),
    onSuccess: () => {
      setLoading(false);
      setOpen(false); // Modalni yopish uchun
      queryClient.invalidateQueries(["dataTable"]);
      openNotification("success", "Компания успешно сохранена");
    },
    onError: (error) => {
      openNotification("error", error.message);
    },
  });

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Добавить компанию
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        maskClosable={false} // Modalni tashqarisini bosganda yopilishiga yo‘l qo‘ymaydi
        closable={!loading} // Modal title yonidagi 'x' tugmachasini loading paytida o‘chiradi
        footer={null}
        title="Добавить компанию"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Название компании"
            name="name"
            rules={[{ required: true, message: "Введите название компании" }]}
          >
            <Input
              type="string"
              placeholder="Введите название"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item
            label="Количество сотрудников"
            name="count"
            rules={[
              { required: true, message: "Введите количество сотрудников" },
              {
                min: 2,
                message: "Введите количество мин 2",
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Введите количество"
              className="rounded-md"
            />
          </Form.Item>
          <div className="flex justify-end">
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
            >
              Добавить компанию
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
