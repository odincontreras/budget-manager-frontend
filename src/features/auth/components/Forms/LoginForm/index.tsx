import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import useAuthStore from "../../../../../store";

type FormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const navigate = useNavigate();

  const { loginHandler, isLoading } = useAuthStore(
    useShallow((state) => ({
      loginHandler: state.loginHandler,
      isLoading: state.isLoading,
    }))
  );

  const onFinish = async (values: FormValues) => {
    const result = await loginHandler(values.email, values.password);

    if (!result.error) {
      navigate("/dashboard");
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Este campo es requerido" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Este campo es requerido" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          style={{ width: "100%" }}
          loading={isLoading}
        >
          Iniciar Sesión
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
