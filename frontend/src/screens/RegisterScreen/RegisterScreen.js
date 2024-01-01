import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
// import RegisterScreen1 from './RegisterScreen/RegisterScreen1';
// import RegisterScreen1 from './RegisterScreen1';

const RegisterScreen= () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);


  const dispatch=useDispatch();

  const userRegister=useSelector((state)=>state.userRegister);
  const {loading ,error,userInfo}=userRegister;
   let navigate =useNavigate();
useEffect(()=>{
  if(userInfo){
    navigate("/mynotes");
  }
},[navigate,userInfo]);

  // const use =useSelector(state=>state.use)
  const submitHandler = async (e) => {
    e.preventDefault();

    if(password!==confirmpassword){
      setMessage('passwords do not match')
    }
    else{
      dispatch(register(name,email,password,pic))
    }
    // console.log(data);
  };

const postDetails = (pics) => {
  if (!pics) {
    return setPicMessage("please select an image");
  }
  setPicMessage(null);
  if (pics.type === "image/jpeg" || pics.type === "image/png") {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "notezipper");
    data.append("cloud_name", "dasar50yf");
    fetch("https://api.cloudinary.com/v1_1/dasar50yf/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setPic(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return setPicMessage("please select an image");
  }
};



  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )} 
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e)=>postDetails(e.target.files[0])}
              type="file"//image
              id="custome-file"
              Label="Upload Profile Picture"
              custom
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};
// };
export default RegisterScreen;
