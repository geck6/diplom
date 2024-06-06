import { Height, LineAxis } from "@mui/icons-material";
import React from "react";
import { Button, Container, Form, NavLink } from "react-bootstrap";
import Card from "react-bootstrap/Card"
import { Col, Row } from "react-bootstrap";
import Registration from "./Registration";


function Login() {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card className="p-5" style={{ width: 600 }}>
                <h2 className="m-auto"> Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите логин"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль"
                    />
                    {/* <Row className="d-flex justify-content-between mt-3 pl-3 pr-3" > */}
                    <div className="mt-3 pl-3 pr-3 justify-content-between" >
                        Нет аккаунта?
                        <br></br>
                        <a href="/registration">
                            <Button className="Reg">
                                Зарегистрируйся!
                            </Button>
                        </a>
                        {/* <NavLink href="/registration">Зарегистрируйся!</NavLink> */}
                    </div>
                    <Button className="mt-3 align-self-end" variant={"outline-success"}>
                        Войти
                    </Button>
                    {/* </Row> */}

                </Form>
            </Card>
        </Container>
    );
}
export default Login;