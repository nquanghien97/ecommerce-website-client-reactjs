import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { mobile } from '../responsive';
import { register } from '../redux/User/user.actions';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const [input, setInput] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    errors: '',
  })
  
  const handleSubmit = async e => {
    e.preventDefault();
    const { fullName, username, password, confirmPassword } = input


    if(password !== confirmPassword) {
      const err = 'Mật khẩu không khớp';
      setInput({
        ...input,
        errors: err
      })
      return;
    }
      try {
        dispatch(register(username, password, fullName)) ;

        setInput({
          fullName: '',
          username: '',
          password: '',
          confirmPassword: '',
          errors: [],
        })
        navigate("/sign-in")
      }
      catch(error) {
        console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    })
  }

  console.log(input)

  return (
    <Container>
      <Content>
      <Title>Đăng ký</Title>
      { input.errors.length > 0 && (
          <p style={{color: 'red'}}>{input.errors}</p>
      )}
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <Input
            name="fullName"
            placeholder="Họ tên"
            value={input.fullName}
            onChange={handleChange}
          />
          <Input
            name="username"
            placeholder="Username"
            value={input.username}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            value={input.password}
            onChange={handleChange}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={input.confirmPassword}
            onChange={handleChange}
          />
        </Wrapper>
        <ButtonWrapper>
          <Button>Đăng ký</Button>
        </ButtonWrapper>
      </Form>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Content = styled.div`
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  ${mobile({
    padding: '40px 0',
    marginTop: '20px',
  })}
`

const Title = styled.h1`
  padding: 20px;
  ${mobile({
    padding: 0,
  })}
`

const Form = styled.form`
  padding: 20px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  width: 400px;
  padding: 16px;
  margin: 8px 0;
  border-radius: 5px;
  border: 1px solid black;
  ${mobile({width: '300px'})};
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`

const Button = styled.button`
  padding: 10px 40px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  width: 50%;
  background-color: #2acd83;
  &:hover {
    background-color: #8dd3b3;
  }
`

export default SignUp