import { Button } from "antd";

function Contact() {
  const onClickLogout = () => {
    window.localStorage.removeItem("jwtToken");
  };
  return (
    <div>
      <Button type="primary" size="large" onClick={onClickLogout} href="/">
        Logout
      </Button>{" "}
    </div>
  );
}

export default Contact;
