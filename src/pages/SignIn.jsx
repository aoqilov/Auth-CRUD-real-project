import React from "react";
import { Form, Input, Button } from "antd";
import mainBgImage from "../assets/mainBg.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../api/api";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../components/uiNotification";

const SignIn = () => {
  const navigate = useNavigate();
  const handleFinish = (values) => {
    const dataSign = { ...values };
    mutate(dataSign);
  };
  const { mutate } = useMutation({
    mutationKey: ["sign"],
    mutationFn: (dataSign) => postData("/api/auths/sign-up", dataSign),
    onSuccess: () => {
      openNotification("success", "Created");
      navigate("/login");
    },
  });

  return (
    <div
      className="flex items-center justify-center bg-no-repeat bg-cover bg-bottom min-w-screen min-h-screen"
      style={{
        backgroundImage: `url(${mainBgImage})`,
      }}
    >
      <div className="bg-white shadow-lg p-6 rounded-lg max-w-[462px] w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Регистрация</h1>
        <Form layout="vertical" onFinish={handleFinish} className="space-y-4">
          <Form.Item
            label="Ф.И.О"
            name="fullName"
            rules={[{ required: true, message: "Введите Ф.И.О" }]}
          >
            <Input placeholder="Введите Ф.И.О" />
          </Form.Item>
          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: "Введите логин" }]}
          >
            <Input placeholder="Введите логин" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>
          <div className="text-left mb-4" onClick={() => navigate("/login")}>
            <a className="text-sm text-blue-500 hover:underline">Вход</a>
          </div>
          <div className="text-center">
            <Button type="primary" htmlType="submit">
              Регистироваться
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
