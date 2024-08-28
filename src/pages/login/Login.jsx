import React, { useRef, useState, useContext } from 'react';
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import './login.css';
import AuthService from '../../api/auth-login';
import { useNavigate } from 'react-router-dom';
const required = (value) => {
  if (!value) {
    return (
      <div className='error' role="alert">
        Không được để trống!
      </div>
    );
  }
};
const Login = () => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(true);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const onChangeUser = (e) => {
    const user = e.target.value;
    setUsername(user);
    if (!user.trim()) {
      setUsernameError('Không được để trống');
    } else {
      setUsernameError('');
    }
  };

  const onChangePassword = (e) => {
    const pass = e.target.value;
    setPassword(pass);
    if (!pass.trim()) {
      setPasswordError('Không được để trống');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate('/'); 
          window.location.reload();
        },
        (error) => {
          const resMessage = (error.response.data.message)
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="card-login">
        <div className="left-login">
          <h1 className="welcome">Welcome to S.WareHouse</h1>
          <p className="desc">
            Hãy bắt đầu dùng trang Warehouse bằng cách đăng nhập. Nếu bạn chưa có tài khoản vui lòng liên hệ admin!
          </p>
        </div>
        <div className="right-login">
          <div className="title">ĐĂNG NHẬP</div>
          <Form onSubmit={handleLogin} ref={form} className="form">
            <div className="form__group field">
              <input className='form__field'
                type="text"
                name="username"
                placeholder="Tài khoản"
                value={username}
                onChange={onChangeUser}
              />
              {usernameError && <div className='error' role="alert">
                Không được để trống!
              </div>}
              <label for="name" class="form__label">Tài khoản</label>
              {/* <span class="input-highlight"></span> */}
            </div>
            <div className="form__group field">
              <input className='form__field'
                type={
                  visible ? "password" : "text"
                }
                name="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={onChangePassword}
              />
              {passwordError && <div className='error' role="alert">
                Không được để trống!
              </div>}
              <label for="name" class="form__label">Mật khẩu</label>
              <div className='eyes' onClick={() => setVisible(!visible)}>
                {visible ? <img className='card-img' src="/icons/icons8-hide-48.png" alt="hide" width="30" height="30" />
                  : <img className='card-img' src="/icons/icons8-show-48.png" alt="show" width="30" height="30" />}
              </div>
            </div>
            <button className="btn-login" disabled={loading}>
              {loading && <i className="fa fa-circle-o-notch fa-spin"></i>}
              <span>Login</span>
            </button>
            {message && (
              <div className="message">
                <div className="alert-login" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;