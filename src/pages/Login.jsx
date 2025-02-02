import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import mainBgImage from "../assets/mainBg.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData, postDataLogin } from "../api/api";
import { openNotification } from "../components/uiNotification";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // router
  const navigate = useNavigate();

  const handleFinish = (values) => {
    const dataLogin = { ...values };
    mutate(dataLogin);
  };
  // tanstack
  const queryClient = useQueryClient();
  // // postdata-login
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (dataLogin) => postDataLogin("/api/auths/sign-in", dataLogin),
    onSuccess: (res) => {
      if (res.status == 400) {
        openNotification("error", res.response.data);
      } else {
        openNotification("success", "Login success");
        navigate("/");
      }
      queryClient.invalidateQueries(["login"]);
    },
    onError: (error) => {
      openNotification("error", error.message);
      queryClient.invalidateQueries(["login"]);
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
        <h1 className="text-2xl font-bold text-left mb-6">Вход</h1>
        <Form layout="vertical" onFinish={handleFinish}>
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
          <div className="text-left mb-4">
            <a href="/signin" className="text-sm text-blue-500 hover:underline">
              Регистрация
            </a>
          </div>
          <div className="text-center">
            <Button type="primary" htmlType="submit">
              вход
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
