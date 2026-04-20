<template>
    <div class="login">
        <div class="login_bg">
            <div class="form">
                <div class="sys_title">
                    <!-- <img style="width: 100%;" src="../../public/img/llggoo.png" alt="" /> -->
                    <span>后台管理系统</span>
                </div>
                <h2 style="color: #00a46d;">账号密码登录</h2>
                <el-form ref="loginbd" :model="loginForm" :rules="rules" class="login_form">
                    <el-form-item prop="username" class="login_form_item"
                        style="border:  1px solid #999; border-radius: 4px;">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名" class="login_form_input" />
                    </el-form-item>

                    <el-form-item prop="password" class="login_form_item"
                        style="border:  1px solid #999; border-radius: 4px;">
                        <el-input v-model="loginForm.password" show-password placeholder="请输入密码"
                            class="login_form_input" />
                    </el-form-item>

                    <el-form-item class="login_form_item">
                        <el-button style="width: 100%" type="primary" class="login_form_input login_form_button"
                            @click="handleLogin">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>


        <Verify @success="capctchaCheckSuccess" @hideCode="hideCode" :mode="'pop'" :captchaType="'blockPuzzle'"
            :imgSize="{ width: '330px', height: '155px' }" ref="verify"></Verify>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { encrypt, decrypt, RSAencrypt, RSAdecrypt } from '@/utils/jsencrypt'
import { login } from '@/api/tdgl.js';
import Verify from '../components/Verifition/Verify'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'


const emits = defineEmits(["close"]);
const router = useRouter();
const loginbd = ref(null)
const verify = ref(null)

const loginForm = reactive({
    username: '',
    password: '',
    rememberMe: false,
    code: '',
    uuid: ''
})
const rules = reactive<FormRules>({
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 4, max: 10, message: "输入4-10位用户名", trigger: "blur" },
    ],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const capctchaCheckSuccess = async (params) => {
    console.log(params)
    loginForm.code = params.captchaVerification;
    if (loginForm.rememberMe) {
        Cookies.set("username", this.loginForm.username, { expires: 30 });
        // Cookies.set("password", encrypt(this.loginForm.password), { expires: 30, });
        Cookies.set("rememberMe", this.loginForm.rememberMe, { expires: 30 });
    } else {
        Cookies.remove("username");
        // Cookies.remove("password");
        Cookies.remove("rememberMe");
    }
    //加密
    loginForm.password = RSAencrypt(loginForm.password)
    // 登录请求
    var res = await login(loginForm)
    console.log(res)
    if (res.code != 200) {
        ElMessage({
            message: res.msg,
            type: 'warning',
        })
        loginForm.password = ''
    }else{
        localStorage.loginForm = JSON.stringify(loginForm);
        router.push({ path: "/" });
        emits("onlogin");
    }

}

const hideCode = (val) => {
}

const handleLogin = () => {
    loginbd.value.validate((valid) => {
        if (valid) {
            verify.value.show();
        }
    })
}



// const submitForm = async (formEl: FormInstance | undefined) => {
//     // router.push({ path: "/login" });
//     if (!formEl) return;
//     await formEl.validate((valid, fields) => {
//         if (valid) {
//             console.log("submit!");
//             // 登录
//             // console.log(ruleForm)
//             loginfun()

//         } else {
//             console.log("error submit!", fields);
//         }
//     })
// };


// const loginfun = async () => {
//     var res = await login({ username: ruleForm.account, password: ruleForm.password })
//     if (res.code == 200) {
//         localStorage.islogin = "1";
//         router.push({ path: "/" });
//     }
//     emits("onlogin");
//     // router.push({ path: "/" });
// }
</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    background: #dee8ff;

    .login_bg {
        width: 100%;
        height: 100%;
        background: url("../../public/img/back.jpg") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .form {
            width: 360px;
            background: #fff;
            border-radius: 0px;
            padding: 24px 32px;

            .sys_title {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                img {
                    width: 70px;
                    height: auto;
                }

                span {
                    font-size: 26px;
                    background-image: -webkit-linear-gradient(bottom, #1890ff, #59abf8, #0369c9);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }

            h2 {
                color: #4d70ff;
                font-size: 17px;
                margin: 20px 0;
            }

            form {
                width: 100%;

                .login_form_item {
                    margin-bottom: 20px;
                    height: 40px;

                    .login_form_input {
                        height: 100%;
                    }

                    .login_form_button {
                        background-color: #00a46d;
                        font-size: 14px;
                    }

                    .login_form_button:hover {
                        background-color: #0d805a;
                    }

                    img {
                        width: 42%;
                        height: 40px;
                        margin-left: 10px;
                    }

                    :deep(.el-form-item__content) {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                }
            }
        }
    }

    .msgCode {
        display: flex;
    }
}
</style>