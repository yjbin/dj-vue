<template>
  <div class="login">
    <div class="header">
      <!-- <span class="header-tit"><img src="../../assets/images/loginLogo.png" alt=""> </span> -->
      <span class="header-login">欢迎您登录系统!</span>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <!-- <el-col :span="6" :offset="5">
          <div class="fl-box">
            <div class="fl-bg">
              <img src="../../assets/images/login.png" alt="">
            </div>
          </div>
        </el-col> -->
        <el-col :span="6" :offset="14">
          <div class="fr-box">
            <div class="bannerLogo">

            </div>
            <div class="fr-box-content">

              <div class="login-tit">
                <p>登录</p>
                <i></i>
              </div>
              <div class="login-content">
                <el-form :model="loginForm" ref="loginForm" :rules="rules">
                  <el-form-item prop="username">
                    <el-input placeholder="用户名" v-model.trim="loginForm.username" name="name">
                      <i slot="prefix" class="el-input__icon person" style="width:20px; height:20px"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password" :class="{marginToggle:error}">
                    <el-input type="password" placeholder="密 码" v-model.trim="loginForm.password" @keyup.enter.native="loginBtn" @focus="inputFocus" name="passwd">
                      <i slot="prefix" class="el-input__icon password-icon" style="width:20px; height:20px"></i>
                    </el-input>
                    <p class="error" v-if="error">用户名和密码不正确</p>
                  </el-form-item>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input v-model.trim="loginForm.captcha" placeholder="请输入验证码" @keyup.enter.native="loginBtn"></el-input>
                    </el-col>
                    <el-col :span="12">
                      <div class="verify-img">
                        <img :src="src" @click="changeImg">
                      </div>
                    </el-col>
                  </el-row>
                  <div class="rember-pass">
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                  </div>
                  <el-button type="primary" @click="loginBtn" style="background-color:#d21523;border:0">登录</el-button>
                </el-form>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <p>版权所有：北京中农信达信息技术有限公司
        <span @click="clearSession" class="clearSession">清除缓存并刷新</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: false,
      src: process.env.BASE_URL + "/captcha.jpg",
      loginForm: {
        username: "",
        password: "",
        captcha: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginBtn() {
      if (this.loginForm.username && this.loginForm.password) {
        let _this = this;
        if (this.checked) {
          this.setCookie(this.loginForm.username, this.loginForm.password, 7);
        } else {
          this.clearCookie(this.loginForm.username);
        }
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            _this.$store
              .dispatch("LoginByUsername", _this.loginForm)
              .then(res => {
                _this.$router.push({ path: "/" });
              })
              .catch(error => {
                _this.$router.push({ path: "/login" });
              });
            _this.$router.push({ path: "/" });
          }
        });
      }
    },
    inputFocus() {
      this.$store.state.user.error = false;
      if (this.loginForm.username) {
        this.getCookie(this.loginForm.username);
      }
    },
    changeImg() {
      this.src = "";
      this.$nextTick(() => {
        this.src = process.env.BASE_URL + "/captcha.jpg";
      });
    },
    getCookie(name) {
      if (name) {
        if (document.cookie.length) {
          let arr = document.cookie.split("; ");
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split("=");
            if (arr2[0] == name) {
              this.checked = true;
              this.loginForm.password = "";
              this.loginForm.password = arr2[1]; //找到所需要的信息返回出来
            }
          }
        } else {
          return;
        }
      }
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      window.document.cookie =
        c_name + "=" + c_pwd + ";expires=" + exdate.toGMTString();
    },
    clearCookie(name) {
      this.setCookie(name, 1, -1);
    },
    clearSession() {
      sessionStorage.clear();
      this.$message({
        message: "清除成功",
        type: "success"
      });
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  }
};
</script>



<style lang="scss" scoped>
.login {
  height: 100vh;
  min-width: 1000px;
  background: url("../../assets/images/big-banner.jpg") no-repeat center;
  background-size: 100% 100%;
  .header {
    height: 120px;
    padding: 0 30px;
    span {
      line-height: 120px;
    }
    .header-tit {
      color: #3383d0;
      font-size: 30px;
      img {
        margin-top: 30px;
      }
    }
    .header-login {
      float: right;
      color: #d11523;
      font-size: 14px;
    }
  }
  .content {
    background-size: 100%;
    width: 100%;
    height: calc(100% - 240px);
  }
  .footer {
    height: 120px;
    line-height: 120px;
    text-align: center;
    p {
      color: #fff;
      font-size: 14px;
      margin: 0;
    }
  }
  .el-row,
  .fl-box,
  .fr-box {
    height: 100%;
    width: 100%;
    // position: relative;
  }
  .el-col {
    height: 100%;
  }
  .fr-box,
  .fl-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .fl-bg {
    height: 100%;
    width: 340px;
    img {
      height: 100%;
    }
  }
  .bannerLogo {
    background: url("../../assets/images/banner-logo.png") no-repeat center;
    position: relative;
    width: 25vw;
    height: 6vh;
    z-index: 1;
    // margin-bottom: 10px;
    top: -10px;
    left: 0px;
    background-size: 100% 100%;
  }
  .fr-box-content {
    // background: #fff;
    box-shadow: 0px 4px 10px #888888;
    width: 29vw;
    // height: 54vh;
    padding: 0 35px 20px 35px;
    position: relative;
    .login-tit {
      p {
        font-size: 24px;
        color: #010101;
        text-align: center;
        line-height: 50px;
        font-weight: 900;
        margin: 0;
      }
      i {
        width: 100%;
        height: 20px;
        background: url("../../assets/images/login_lucency.png") no-repeat
          center;
        display: inline-block;
      }
    }

    .login-content {
      width: 100%;
      // height: 310px;
      .person {
        background: url("../../assets/images/username.png") no-repeat;
        width: 13px;
        height: 13px;
      }
      .password-icon {
        background: url("../../assets/images/password.png") no-repeat;
        width: 13px;
        height: 13px;
      }
      .error {
        font-size: 14px;
        color: red;
      }
      .marginToggle {
        margin-bottom: 0;
      }
    }
    .el-row,
    .el-col {
      height: 40px;
    }
    .verify-img {
      height: 100%;
      margin-right: -20px;
      img {
        height: 100%;
      }
    }
    .rember-pass {
      margin: 20px 0;
      span {
        color: #999999;
        font-size: 14px;
      }
    }
  }
  img {
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
  .clearSession {
    margin-left: 20px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.login {
  .el-input__prefix {
    display: flex;
    align-items: center;
  }
  .rember-pass {
    span {
      color: #000;
      font-size: 14px;
    }
  }
  .el-button {
    width: 100%;
  }
}
</style>
